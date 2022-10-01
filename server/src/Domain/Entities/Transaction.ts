import Uuid from "../ValueObjects/Uuid";
import {User} from "./User";
import {Nullable} from "../ValueObjects/Nullable";
import TransactionCategory from "../ValueObjects/TransactionCategory";
import TransactionStatus from "../ValueObjects/TransactionStatus";
import Money from "../ValueObjects/Money";

class Transaction {

  private id: Uuid;
  private user: User;
  private amount: Money;
  private category: TransactionCategory;
  private status: TransactionStatus;
  private createdAt!: Date;
  private updatedAt!: Date;
  private deleted: boolean = false;
  private deletedAt: Nullable<Date> = null;
  private userBet: Nullable<UserBet> = null;


  static fromPrimitives(primitives: any): Transaction {
    return new Transaction()
  }

  toPrimitives(): any {
    return {
      id: this.id.toString(),
      user_id: this.user.getId().toString(),
      amount: this.amount.toString(),
      category: this.category.toString(),
    };
  }
}
