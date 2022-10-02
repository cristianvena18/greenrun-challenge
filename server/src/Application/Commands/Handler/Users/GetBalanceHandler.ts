import {IUserRepository} from "../../../../Domain/Contracts/IUserRepository";
import GetBalanceCommand from "../../Command/Users/GetBalanceCommand";
import UserBalance from "../../../../Domain/ValueObjects/UserBalance";

class GetBalanceHandler {

  constructor(
    private userRepository: IUserRepository
  ) {
  }

  public async execute(command: GetBalanceCommand): Promise<UserBalance> {
    const user = await this.userRepository.getByIdOrFail(command.getUserId());

    const result = user.getBalance();

    return new UserBalance(user.getId(), result);
  }
}

export default GetBalanceHandler;
