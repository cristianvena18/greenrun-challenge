import Money from "../../../../Domain/ValueObjects/Money";

class CreateBetCommand {

  constructor(
    private option: string,
    private sport: string,
    private name: string,
    private eventId: string,
    private baseOdd: Money,
  ) {
  }

  getOption(): string {
    return this.option;
  }

  getSport(): string {
    return this.sport;
  }

  getName(): string {
    return this.name;
  }

  getEventId(): string {
    return this.eventId;
  }

  getBaseOdd(): Money {
    return this.baseOdd;
  }
}

export default CreateBetCommand;
