import Uuid from "../ValueObjects/Uuid";
import Money from "../ValueObjects/Money";
import { Nullable } from "../ValueObjects/Nullable";
import BetStatus from "../ValueObjects/BetStatus";
import BetResult from "../ValueObjects/BetResult";

class Bet {
  private id: Uuid;
  private option: string;
  private sport: string;
  private status: BetStatus;
  private name: string;
  private eventId: string;
  private odd: Money;
  private result: BetResult;
  private createdAt: Date;
  private updatedAt: Date;
  private deleted: boolean = false;
  private deletedAt: Nullable<Date> = null;

  static fromPrimitives(primitives: any): Bet {
    return new Bet();
  }

  toPrimitives(): any {
    return {

    }
  }
}

export default Bet;
