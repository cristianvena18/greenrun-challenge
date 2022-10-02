import Money from "../../../../Domain/ValueObjects/Money";
import Uuid from "../../../../Domain/ValueObjects/Uuid";

class WithdrawMoneyCommand {

  constructor(
    private amount: Money,
    private userId: Uuid
  ) {
  }

  getUserId(): string {
    return this.userId.toString();
  }

  getAmount(): Money {
    return this.amount;
  }
}

export default WithdrawMoneyCommand;
