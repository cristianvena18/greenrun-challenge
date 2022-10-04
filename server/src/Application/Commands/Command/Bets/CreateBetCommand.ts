class CreateBetCommand {

  constructor(
    private option: string,
    private sport: string,
    private name: string,
    private eventId: string,
    private baseOdd: number,
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

  getBaseOdd(): number{
    return this.baseOdd;
  }
}

export default CreateBetCommand;
