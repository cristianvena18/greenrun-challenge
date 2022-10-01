import Uuid from "../ValueObjects/Uuid";
import { User } from "./User";
import Bet from "./Bet";
import Money from "../ValueObjects/Money";
import {Nullable} from "../ValueObjects/Nullable";
import UserBetState from "../ValueObjects/UserBetState";

class UserBet {
  private id: Uuid;
  private user: User;
  private bet: Bet;
  private odd: Money;
  private amount: Money;
  private state: UserBetState;
  private createdAt: Date;
  private updatedAt: Date;
  private deleted: boolean = false;
  private deletedAt: Nullable<Date> = null;

  static fromPrimitives(primitives: any): UserBet {
    return new UserBet();
  }

  toPrimitives(): any {
    return {}
  }
}
