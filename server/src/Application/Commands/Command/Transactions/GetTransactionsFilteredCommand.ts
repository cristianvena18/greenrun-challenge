import TransactionCategory from "../../../../Domain/ValueObjects/TransactionCategory";
import {Nullable} from "../../../../Domain/ValueObjects/Nullable";
import Uuid from "../../../../Domain/ValueObjects/Uuid";

class GetTransactionsFilteredCommand {

  constructor(
    private userId: Uuid,
    private category: Nullable<TransactionCategory>,
  ) {
  }


  getUserId(): string {
    return this.userId.toString();
  }

  getCategory(): Nullable<string> {
    return this.category?.value || null
  }
}

export default GetTransactionsFilteredCommand;
