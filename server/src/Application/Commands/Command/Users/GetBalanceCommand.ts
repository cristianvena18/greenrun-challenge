import Uuid from "../../../../Domain/ValueObjects/Uuid";

class GetBalanceCommand {

  constructor(
    private userId: Uuid,
  ) {
  }

  getUserId(): string {
    return this.userId.toString();
  }
}

export default GetBalanceCommand;
