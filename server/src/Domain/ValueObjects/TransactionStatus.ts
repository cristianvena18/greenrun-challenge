import EnumValueObject from "./EnumValueObject";

class TransactionStatus extends EnumValueObject<string>{

  public static readonly VALID_VALUES = ['active', 'deleted', 'completed'];
  static COMPLETED: string = 'completed';

  constructor(status: string) {
    super(status, TransactionStatus.VALID_VALUES);
  }

  protected throwErrorForInvalidValue(value: string) {
    throw new Error('invalid transactions');
  }

}

export default TransactionStatus;
