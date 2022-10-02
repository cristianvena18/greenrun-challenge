import Uuid from "../../../../Domain/ValueObjects/Uuid";
import BetResult from "../../../../Domain/ValueObjects/BetResult";

class SettleBetResultCommand {
  constructor(
    private id: Uuid,
    private result: BetResult,
  ) {
  }

  getId(): string {
    return this.id.toString();
  }

  getResult(): BetResult {
    return this.result;
  }
}

export default SettleBetResultCommand;
