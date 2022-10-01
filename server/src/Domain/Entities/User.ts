import Uuid from "../ValueObjects/Uuid";
import {UserRole} from "../ValueObjects/UserRole";
import UserState from "../ValueObjects/UserState";
import { Nullable } from "../ValueObjects/Nullable";

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

  constructor(id: Uuid, userRole: UserRole, firstName: string, lastName: string, email: string, username: string) {
    this.id = id;
    this.role = userRole;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.username = username;
  }

  static fromPrimitives(primitives: any): User {
    return new User(
      new Uuid(primitives.id),
      new UserRole(primitives.role),
      primitives.firstName,
      primitives.lastName,
      primitives.email,
      primitives.username,
    );
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
    return {}
  }

  getId() {
    return this.id;
  }
}

export {
  User,
}
