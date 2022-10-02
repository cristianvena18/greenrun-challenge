import {IUserRepository} from "../../../../Domain/Contracts/IUserRepository";
import WithdrawMoneyCommand from "../../Command/Users/WithdrawMoneyCommand";

class WithdrawMoneyHandler {

  constructor(
    private userRepository: IUserRepository
  ) {
  }

  public async execute(command: WithdrawMoneyCommand): Promise<void> {
    const user = await this.userRepository.getByIdOrFail(command.getUserId());

    user.withdraw(command.getAmount());

    await this.userRepository.save(user);
  }
}

export default WithdrawMoneyHandler;
