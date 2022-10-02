import Uuid from "../ValueObjects/Uuid";
import {User} from "./User";
import {Nullable} from "../ValueObjects/Nullable";
import TransactionCategory from "../ValueObjects/TransactionCategory";
import TransactionStatus from "../ValueObjects/TransactionStatus";
import Money from "../ValueObjects/Money";
import UserBet from "./UserBet";

class Transaction {
  private id: Uuid;
  private user!: User;
  private amount: Money;
  private category: TransactionCategory;
  private status: TransactionStatus;
  private createdAt!: Date;
  private updatedAt!: Date;
  private deleted: boolean = false;
  private deletedAt: Nullable<Date> = null;
  private userBet: Nullable<UserBet> = null;

  constructor(id: Uuid, user: User, amount: Money, category: TransactionCategory, status: TransactionStatus) {
    this.id = id;
    this.user = user;
    this.amount = amount;
    this.category = category;
    this.status = status;
  }

  static create(user: User, amount: Money, category: string, status: string) {
    const id = new Uuid(Uuid.random().value)
    const transaction = new Transaction(id, user, amount, new TransactionCategory(category), new TransactionStatus(status))
    transaction.createdAt = new Date();
    transaction.updatedAt = new Date();

    return transaction;
  }

  static fromPrimitives(primitives: any): Transaction {
    const transaction = new Transaction(
      new Uuid(primitives.id),
      // @ts-ignore
      primitives.user ? User.fromPrimitives(primitives.user) : null,
      Money.fromPrimitives(primitives.amount),
      new TransactionCategory(primitives.category),
      new TransactionStatus(primitives.status),
    );

    transaction.createdAt = new Date(primitives.created_at);
    transaction.updatedAt = new Date(primitives.updated_at);
    transaction.deleted = primitives.deleted;
    transaction.deletedAt = primitives.deleted_at ? new Date(primitives.deleted_at) : null;
    transaction.userBet = primitives.userBet ? UserBet.fromPrimitives(primitives.userBet) : null;

    return transaction;
  }

  toPrimitives(): any {
    return {
      id: this.id.toString(),
      user_id: this.user?.getId().toString(),
      amount: this.amount.amount,
      category: this.category.value,
      status: this.status.value,
      created_at: this.createdAt.toISOString(),
      updated_at: this.updatedAt.toISOString(),
      deleted: this.deleted,
      deleted_at: this.deletedAt?.toString(),
      user_bet_id: this.userBet?.getId().toString(),
    };
  }

  isCategory(category: string) {
    return this.category.equals(category);
  }

  getId() {
    return this.id;
  }
}

export default Transaction;
