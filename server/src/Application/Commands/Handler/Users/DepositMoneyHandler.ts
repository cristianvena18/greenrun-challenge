import { IUserRepository } from "../../../../Domain/Contracts/IUserRepository";
import DepositMoneyCommand from "../../Command/Users/DepositMoneyCommand";

class DepositMoneyHandler {
  constructor(
    private userRepository: IUserRepository,
  ) {}

  public async execute(command: DepositMoneyCommand): Promise<void> {
    const user = await this.userRepository.getByIdOrFail(command.getUserId());

    user.deposit(command.getAmount());

    await this.userRepository.save(user);
  }
}

export default DepositMoneyHandler;
