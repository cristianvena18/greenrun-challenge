import Uuid from "../../../../Domain/ValueObjects/Uuid";
import Money from "../../../../Domain/ValueObjects/Money";

class DepositMoneyCommand {

  constructor(
    private userId: Uuid,
    private amount: Money,
  ) {}


  getUserId(): string {
    return this.userId.value;
  }

  getAmount(): Money {
    return this.amount
  }
}

export default DepositMoneyCommand;
