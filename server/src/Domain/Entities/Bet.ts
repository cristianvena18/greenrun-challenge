import Uuid from "../ValueObjects/Uuid";
import Money from "../ValueObjects/Money";
import {Nullable} from "../ValueObjects/Nullable";
import BetStatus from "../ValueObjects/BetStatus";
import BetResult from "../ValueObjects/BetResult";
import {User} from "./User";
import UserBet from "./UserBet";
import {BetNotActiveException} from "../Exceptions/BetNotActiveException";
import UnprocessableStatusChange from "../Exceptions/UnprocessableStatusChange";

class Bet {
  private id: Uuid;
  private option: string;
  private sport: string;
  private status!: BetStatus;
  private name: string;
  private eventId: string;
  private odd: Money;
  private result: Nullable<BetResult> = null;
  private createdAt!: Date;
  private updatedAt!: Date;
  private deleted: boolean = false;
  private deletedAt: Nullable<Date> = null;
  private users: Array<UserBet> = [];

  constructor(id: Uuid, option: string, sport: string, name: string, eventId: string, odd: Money) {

    this.id = id;
    this.option = option;
    this.sport = sport;
    this.name = name;
    this.eventId = eventId;
    this.odd = odd;
  }

  static create(option: string, sport: string, name: string, eventId: string, odd: Money): Bet {
    const id = new Uuid(Uuid.random().value);
    const bet = new Bet(id, option, sport, name, eventId, odd);

    bet.createdAt = new Date();
    bet.updatedAt = new Date();
    bet.status = new BetStatus(BetStatus.ACTIVE);

    return bet;
  }

  static fromPrimitives(primitives: any): Bet {
    const bet = new Bet(
      new Uuid(primitives.id),
      primitives.option,
      primitives.sport,
      primitives.name,
      primitives.event_id,
      Money.fromPrimitives(primitives.odd),
    );

    bet.createdAt = new Date(primitives.created_at);
    bet.updatedAt = new Date(primitives.updated_at);
    bet.deletedAt = primitives.deleted_at ? new Date(primitives.deleted_at) : null;
    bet.deleted = primitives.deleted;
    bet.status = new BetStatus(primitives.status);
    bet.result = primitives.result ? new BetResult(primitives.result) : null;
    bet.users = primitives.users?.map(UserBet.fromPrimitives) || [];

    return bet;
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      bet_option: this.option,
      sport: this.sport,
      name: this.name,
      event_id: this.eventId,
      odd: this.odd.amount,
      status: this.status.value,
      created_at: this.createdAt.toISOString(),
      updated_at: this.updatedAt.toISOString(),
      deleted_at: this.deletedAt?.toISOString(),
      deleted: this.deleted,
      result: this.result?.value,
      users: this.users.map(user => user.toPrimitives())
    };
  }

  isActive() {
    return this.status.equals(BetStatus.ACTIVE);
  }

  public place(user: User, amount: Money) {
    if (!this.isActive()) {
      throw new BetNotActiveException();
    }

    const userBet = UserBet.create(user, this, amount);
    user.placeBet(amount);
    this.users.push(userBet);
    return userBet;
  }

  public changeStatus(status: BetStatus) {
    if (this.status.equals(BetStatus.SETTLED)) {
      throw new UnprocessableStatusChange();
    }

    if (status.equals(BetStatus.SETTLED)) {
      throw new UnprocessableStatusChange('please use settle method to change status');
    }

    this.status = status;
    this.updatedAt = new Date();
  }

  public settle(result: BetResult) {
    if (!this.isActive()) {
      throw new BetNotActiveException();
    }

    this.status = new BetStatus(BetStatus.SETTLED);
    this.result = result;

    this.updatedAt = new Date();
  }

  public getId() {
    return this.id;
  }
}

export default Bet;
