import Uuid from "../ValueObjects/Uuid";
import {UserRole} from "../ValueObjects/UserRole";
import UserState from "../ValueObjects/UserState";
import {Nullable} from "../ValueObjects/Nullable";
import Money from "../ValueObjects/Money";
import TransactionCategory from "../ValueObjects/TransactionCategory";
import TransactionStatus from "../ValueObjects/TransactionStatus";
import Transaction from "./Transaction";
import {InvalidAmount} from "../Exceptions/InvalidAmount";

class User {
  private id: Uuid;
  private role: UserRole;
  private firstName: string;
  private lastName: string;
  private phone: Nullable<string> = null;
  private email: string;
  private username: string;
  private address: Nullable<string> = null;
  private gender: Nullable<string> = null;
  private birthDate: Nullable<Date> = null;
  private countryId: Nullable<string> = null;
  private city: Nullable<string> = null;
  private category: Nullable<string> = null;
  private documentIdentity: Nullable<string> = null;
  private state!: UserState;
  private createdAt!: Date;
  private updatedAt!: Date;
  private deleted: boolean = false;
  private deletedAt: Nullable<Date> = null;
  private amount!: Money;
  private transactions: Array<Transaction> = [];

  constructor(id: Uuid, userRole: UserRole, firstName: string, lastName: string, email: string, username: string) {
    this.id = id;
    this.role = userRole;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.username = username;
  }

  static fromPrimitives(primitives: any): User {
    const user = new User(
      new Uuid(primitives.id),
      new UserRole(primitives.role),
      primitives.firstName,
      primitives.lastName,
      primitives.email,
      primitives.username,
    );

    user.transactions = primitives.transactions.map(Transaction.fromPrimitives)
    user.amount = primitives.amount ? Money.fromPrimitives(primitives.amount) : Money.fromInteger(0, 'USD');
    user.state = new UserState(primitives.user_state);
    user.createdAt = new Date(primitives.created_at);
    user.updatedAt = new Date(primitives.updated_at);
    user.deletedAt = primitives.deleted_at ? new Date(primitives.deleted_at) : null;
    user.deleted = primitives.deleted;

    return user;
  }

  private static createAsAdmin(
    firstName: string,
    lastName: string,
    email: string,
    username: string,
  ) {

    const user = new User(new Uuid(Uuid.random().value), new UserRole(UserRole.ADMIN), firstName, lastName, email, username);

    user.state = new UserState(UserState.ACTIVE)
    user.createdAt = new Date();
    user.updatedAt = new Date();

    return user;
  }

  toPrimitives(): any {
    return {
      id: this.id.toString(),
      first_name: this.firstName,
      last_name: this.lastName,
      phone: this.phone,
      email: this.email,
      username: this.username,
      address: this.address,
      gender: this.gender,
      birth_date: this.birthDate?.toString(),
      country_id: this.countryId,
      city: this.city,
      category: this.category,
      document_identity: this.documentIdentity,
      user_state: this.state.value,
      created_at: this.createdAt.toISOString(),
      updated_at: this.updatedAt.toISOString(),
      deleted: this.deleted,
      deleted_at: this.deletedAt?.toString(),
      amount: this.amount.amount,
      transactions: this.transactions.map(transaction => transaction.toPrimitives()),
    }
  }

  getId() {
    return this.id;
  }

  canPlaceBet(amount: Money) {
    return this.amount.greaterThanOrEqual(amount);
  }

  placeBet(amount: Money) {
    const transaction = Transaction.create(this, amount, TransactionCategory.BET, TransactionStatus.COMPLETED)

    this.amount = this.amount.subtract(amount);
    this.transactions.push(transaction);
  }

  deposit(amount: Money) {
    if (!amount.isPositive()) {
      throw new InvalidAmount();
    }

    const transaction = Transaction.create(this, amount, TransactionCategory.DEPOSIT, TransactionStatus.COMPLETED)

    this.amount = this.amount.add(amount);
    this.transactions.push(transaction);
  }

  withdraw(amount: Money) {

    if (this.amount.lessThan(amount)) {
      throw new InvalidAmount('invalid amount, must be less than available amount');
    }

    const transaction = Transaction.create(this, amount, TransactionCategory.WITHDRAW, TransactionStatus.COMPLETED)

    this.amount = this.amount.subtract(amount);
    this.transactions.push(transaction);
  }

  getBalance() {
    return this.amount;
  }

  getTransactions(category: Nullable<string>) {

    if (category === null) {
      return this.transactions;
    }

    return this.transactions.filter(transaction => transaction.isCategory(category));
  }

  isAdmin() {
    return this.role.equals(UserRole.ADMIN);
  }

  block() {
    this.state = new UserState(UserState.BLOCKED)
    this.updatedAt = new Date();
  }
}

export {
  User,
}
