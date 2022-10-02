import CustomMoney from "../../../../Domain/ValueObjects/Money";
import Money from "../../../../Domain/ValueObjects/Money";
import Uuid from "../../../../Domain/ValueObjects/Uuid";

class PlaceBetCommand {
  private amount: CustomMoney;

  constructor(
    private userId: Uuid,
    amount: Money,
    private betId: Uuid,
  ) {
    this.amount = CustomMoney.fromInteger(amount.amount, amount.currency)
  }


  getUserId(): string {
    return this.userId.toString();
  }

  getAmount(): Money {
    return this.amount;
  }

  getBetId(): string {
    return this.betId.toString();
  }
}

export default PlaceBetCommand;
