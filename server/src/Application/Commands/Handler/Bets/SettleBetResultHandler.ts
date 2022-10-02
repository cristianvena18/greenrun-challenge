import {IBetRepository} from "../../../../Domain/Contracts/IBetRepository";
import SettleBetResultCommand from "../../Command/Bets/SettleBetResultCommand";

class SettleBetResultHandler {

  constructor(private betRepository: IBetRepository) {
  }

  public async execute(command: SettleBetResultCommand): Promise<void> {
    const bet = await this.betRepository.getByIdOrFail(command.getId());

    bet.settle(command.getResult());

    await this.betRepository.save(bet);

  }
}

export default SettleBetResultHandler;
