import EnumValueObject from "./EnumValueObject";

class UserBetState extends EnumValueObject<string> {

  public static readonly VALID_VALUES = ['open', 'won', 'lost'];
  static OPEN: string = 'open';

  constructor(state: string) {
    super(state, UserBetState.VALID_VALUES);
  }

  protected throwErrorForInvalidValue(value: string) {
    throw new Error('invalid user bet status value');
  }
}

export default UserBetState;
