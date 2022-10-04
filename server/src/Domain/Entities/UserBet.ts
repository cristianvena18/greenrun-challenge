import Uuid from "../ValueObjects/Uuid";
import {User} from "./User";
import Bet from "./Bet";
import Money from "../ValueObjects/Money";
import {Nullable} from "../ValueObjects/Nullable";
import UserBetState from "../ValueObjects/UserBetState";

class UserBet {
  private id: Uuid;
  private user: User;
  private bet: Bet;
  private odd?: number;
  private amount: Nullable<Money> = null;
  private state!: UserBetState;
  private createdAt!: Date;
  private updatedAt!: Date;
  private deleted: boolean = false;
  private deletedAt: Nullable<Date> = null;

  constructor(id: Uuid, user: User, bet: Bet, amount: Money) {
    this.id = id;
    this.user = user;
    this.bet = bet;
    this.amount = amount;
  }

  static fromPrimitives(primitives: any): UserBet {
    const userBet = new UserBet(
      new Uuid(primitives.id),
      User.fromPrimitives(primitives.user),
      // @ts-ignore I didn't solve this problem
      primitives.bet ? Bet.fromPrimitives(primitives.bet) : undefined,
      primitives.odd,
    );

    userBet.state = new UserBetState(primitives.state);
    userBet.createdAt = new Date(primitives.created_at);
    userBet.updatedAt = new Date(primitives.updated_at);
    userBet.deletedAt = primitives.deleted_at ? new Date(primitives.deleted_at) : null;
    userBet.deleted = primitives.deleted;
    userBet.amount = primitives.amount ? Money.fromPrimitives(primitives.amount) : null;

    return userBet;
  }

  static create(user: User, bet: Bet, amount: Money): UserBet {
    const id = new Uuid(Uuid.random().toString());
    const userBet = new UserBet(id, user, bet, amount);

    userBet.state = new UserBetState(UserBetState.OPEN)
    userBet.createdAt = new Date();
    userBet.updatedAt = new Date();

    return userBet;
  }

  toPrimitives(): any {
    // TODO
    return {
      id: this.id.toString(),
      user_id: this.user.getId().toString(),
      bet_id: this.bet?.getId().toString(),
      odd: this.odd,
      amount: this.amount?.amount,
      state: this.state.value,
      created_at: this.createdAt.toISOString(),
      updated_at: this.updatedAt.toISOString(),
      deleted: this.deleted,
      deleted_at: this.deletedAt?.toISOString(),
    }
  }

  getId() {
    return this.id;
  }

  payWithOdd(odd: number, result: UserBetState) {
    if (!this.amount) {
      throw new Error('i dont know');
    }

    this.state = result;
    this.odd = odd;
    if (result.equals(UserBetState.WON)) {
      const amount = this.amount.multiply(odd);
      this.user.payBet(amount)
    }
  }

  getUser() {
    return this.user;
  }
}

export default UserBet;
