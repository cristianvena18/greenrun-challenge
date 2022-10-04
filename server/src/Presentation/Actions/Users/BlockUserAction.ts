import BaseAction from "../BaseAction";
import {Request, ResponseObject, ResponseToolkit} from "@hapi/hapi";
import BlockUserCommand from "../../../Application/Commands/Command/Users/BlockUserCommand";
import Uuid from "../../../Domain/ValueObjects/Uuid";
import BlockUserHandler from "../../../Application/Commands/Handler/Users/BlockUserHandler";
import {ErrorHandler} from "../../Utils/ErrorHandler";

class BlockUserAction extends BaseAction {
  METHOD: "PUT" = 'PUT';
  ROUTE_PATH: string = '/users/{id}/block';

  constructor(private handler: BlockUserHandler) {
    super();
  }

  async run(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
    const {id} = request.params;

    try {
      const command = new BlockUserCommand(new Uuid(id))

      await this.handler.execute(command);

    } catch (err) {
      return ErrorHandler.resolve(err as Error, h);
    }

    return h.response().code(200);
  }
}

export default BlockUserAction;
