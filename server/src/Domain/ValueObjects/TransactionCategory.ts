import EnumValueObject from "./EnumValueObject";

class TransactionCategory extends EnumValueObject<string>{

  public static readonly VALID_VALUES = ['deposit', 'withdraw', 'bet', 'winning']

  constructor(category: string) {
    super(category, TransactionCategory.VALID_VALUES);
  }

  protected throwErrorForInvalidValue(value: string) {
    throw new Error('invalid category for transaction');
  }
}

export default TransactionCategory;
