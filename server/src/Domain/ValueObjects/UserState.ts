import EnumValueObject from "./EnumValueObject";

class UserState extends EnumValueObject<string> {

  public static readonly VALID_VALUES = ['active', 'suspended']
  static ACTIVE: string = 'active';

  constructor(state: string) {
    super(state, UserState.VALID_VALUES);
  }

  protected throwErrorForInvalidValue(value: string) {
    throw new Error("Invalid state");
  }

}

export default UserState;
