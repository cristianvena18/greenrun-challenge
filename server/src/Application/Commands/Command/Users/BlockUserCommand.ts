import Uuid from "../../../../Domain/ValueObjects/Uuid";

class BlockUserCommand {

  constructor(
    private id: Uuid,
  ) {
  }

  getId(): string {
    return this.id.toString();
  }

}

export default BlockUserCommand;
