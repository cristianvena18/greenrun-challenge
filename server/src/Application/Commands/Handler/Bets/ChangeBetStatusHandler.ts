import { IBetRepository } from "../../../../Domain/Contracts/IBetRepository";
import ChangeBetStatusCommand from "../../Command/Bets/ChangeBetStatusCommand";

class ChangeBetStatusHandler {

  constructor(
    private betRepository: IBetRepository,
  ) {}

  public async execute(command: ChangeBetStatusCommand): Promise<void> {
    const bet = await this.betRepository.getByIdOrFail(command.getId());

    bet.changeStatus(command.getStatus());

    await this.betRepository.save(bet);
  }
}

export default ChangeBetStatusHandler;
