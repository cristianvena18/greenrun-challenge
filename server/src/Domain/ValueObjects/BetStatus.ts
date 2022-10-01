import EnumValueObject from "./EnumValueObject";

class BetStatus extends EnumValueObject<string> {

  public static readonly VALID_VALUES = ['active', 'cancelled', 'settled']

  constructor(status: string) {
    super(status, BetStatus.VALID_VALUES);
  }

  protected throwErrorForInvalidValue(value: string) {
    throw new Error('invalid bet status');
  }
}

export default BetStatus;
