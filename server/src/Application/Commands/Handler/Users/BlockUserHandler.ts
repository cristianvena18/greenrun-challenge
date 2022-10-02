import { IUserRepository } from "../../../../Domain/Contracts/IUserRepository";
import BlockUserCommand from "../../Command/Users/BlockUserCommand";
import ForbiddenUserException from "../../../../Domain/Exceptions/ForbiddenUserException";

class BlockUserHandler {

  constructor(
    private userRepository: IUserRepository
  ) {}

  public async execute(command: BlockUserCommand): Promise<void> {

    const user = await this.userRepository.getByIdOrFail(command.getId());

    if (user.isAdmin()) {
      throw new ForbiddenUserException()
    }

    user.block()

    await this.userRepository.save(user);
  }
}

export default BlockUserHandler;
