import PlaceBetCommand from "../../Command/Bets/PlaceBetCommand";
import {IBetRepository} from "../../../../Domain/Contracts/IBetRepository";
import {IUserRepository} from "../../../../Domain/Contracts/IUserRepository";
import {BetNotActiveException} from "../../../../Domain/Exceptions/BetNotActiveException";
import {InsufficientMoneyException} from "../../../../Domain/Exceptions/InsufficientMoneyException";

class PlaceBetHandler {

  constructor(
    private betRepository: IBetRepository,
    private userRepository: IUserRepository,
  ) {}


  public async execute(command: PlaceBetCommand): Promise<void> {
    const bet = await this.betRepository.getByIdOrFail(command.getBetId());

    const user = await this.userRepository.getByIdOrFail(command.getUserId())

    if (!bet.isActive()) {
      throw new BetNotActiveException();
    }

    if (!user.canPlaceBet(command.getAmount())) {
      throw new InsufficientMoneyException();
    }

    bet.place(user, command.getAmount());


    await this.betRepository.save(bet);
    await this.userRepository.save(user);
  }
}

export default PlaceBetHandler;
