import EnumValueObject from "./EnumValueObject";

export class UserRole extends EnumValueObject<string> {

  public static readonly VALID_ROLES = ['admin', 'user'];
  static ADMIN: string = 'admin';

  constructor(role: string) {
    super(role, UserRole.VALID_ROLES);
  }

  protected throwErrorForInvalidValue(value: string) {
    throw new Error('invalid role');
  }
}
