import EnumValueObject from "./EnumValueObject";

class UserState extends EnumValueObject<string> {

  public static readonly VALID_VALUES = ['active', 'blocked']
  static ACTIVE: string = 'active';
  static BLOCKED: string = 'blocked';

  constructor(state: string) {
    super(state, UserState.VALID_VALUES);
  }

  protected throwErrorForInvalidValue(value: string) {
    throw new Error("Invalid state");
  }

}

export default UserState;
