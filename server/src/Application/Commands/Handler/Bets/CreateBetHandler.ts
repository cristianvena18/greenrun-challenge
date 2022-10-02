import {IBetRepository} from "../../../../Domain/Contracts/IBetRepository";
import CreateBetCommand from "../../Command/Bets/CreateBetCommand";
import Bet from "../../../../Domain/Entities/Bet";

class CreateBetHandler {

  constructor(
    private betRepository: IBetRepository,
  ) {
  }

  public async execute(command: CreateBetCommand): Promise<void> {

    // TODO add validation for is already exist this bet

    const bet = Bet.create(
      command.getOption(),
      command.getSport(),
      command.getName(),
      command.getEventId(),
      command.getBaseOdd()
    );

    await this.betRepository.save(bet);
  }
}

export default CreateBetHandler;
