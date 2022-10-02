import Uuid from "../../../../Domain/ValueObjects/Uuid";
import BetStatus from "../../../../Domain/ValueObjects/BetStatus";

class ChangeBetStatusCommand {

  constructor(
    private id: Uuid,
    private status: BetStatus,
  ) {}

  getId(): string {
    return this.id.toString();
  }

  getStatus(): BetStatus {
    return this.status;
  }
}

export default ChangeBetStatusCommand;
