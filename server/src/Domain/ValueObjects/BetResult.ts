import EnumValueObject from "./EnumValueObject";

export default class BetResult extends EnumValueObject<string> {

  public static readonly VALID_VALUES = ['win', 'lost'];
  static WIN: string = 'win';

  constructor(result: string) {
    super(result, BetResult.VALID_VALUES);
  }

  protected throwErrorForInvalidValue(value: string) {
    throw new Error('invalid result value');
  }
}
