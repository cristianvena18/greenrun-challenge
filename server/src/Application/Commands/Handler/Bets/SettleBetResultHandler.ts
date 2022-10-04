import {IBetRepository} from "../../../../Domain/Contracts/IBetRepository";
import SettleBetResultCommand from "../../Command/Bets/SettleBetResultCommand";
import {IUserRepository} from "../../../../Domain/Contracts/IUserRepository";

class SettleBetResultHandler {

  constructor(
    private betRepository: IBetRepository,
    private userRepository: IUserRepository
  ) {
  }

  public async execute(command: SettleBetResultCommand): Promise<void> {
    const bet = await this.betRepository.getFullByIdOrFail(command.getId());

    bet.settle(command.getResult());

    await this.betRepository.save(bet);

    const betUsers = bet.getUsers()

    for (const betUser of betUsers) {
      await this.userRepository.save(betUser.getUser())
    }
  }
}

export default SettleBetResultHandler;
