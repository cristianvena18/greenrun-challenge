import {IUserRepository} from "../../../../Domain/Contracts/IUserRepository";
import GetTransactionsFilteredCommand from "../../Command/Transactions/GetTransactionsFilteredCommand";
import Transaction from "../../../../Domain/Entities/Transaction";

class GetTransactionsFilteredHandler {

  constructor(
    private userRepository: IUserRepository
  ) {}

  public async execute(command: GetTransactionsFilteredCommand): Promise<Array<Transaction>> {
    // TODO add search by transaction repository for admin users
    const user = await this.userRepository.getByIdOrFail(command.getUserId())

    const transactions = user.getTransactions(command.getCategory())

    return transactions;
  }
}

export default GetTransactionsFilteredHandler;
