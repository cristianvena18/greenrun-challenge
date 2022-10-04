import BaseAction from "../BaseAction";
import {Request, ResponseObject, ResponseToolkit} from "@hapi/hapi";
import GetBalanceCommand from "../../../Application/Commands/Command/Users/GetBalanceCommand";
import Uuid from "../../../Domain/ValueObjects/Uuid";
import GetBalanceHandler from "../../../Application/Commands/Handler/Users/GetBalanceHandler";
import {ErrorHandler} from "../../Utils/ErrorHandler";

class GetBalanceAction extends BaseAction {
  METHOD: "GET" = "GET";
  ROUTE_PATH: string = '/users/{id}/balance';

  constructor(private handler: GetBalanceHandler) {
    super();
  }

  async run(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
    const {id} = request.params;

    try {
      const command = new GetBalanceCommand(new Uuid(id));

      const result = await this.handler.execute(command);

      return h.response({balance: result.getBalance()}).code(200)
    } catch (err) {
      return ErrorHandler.resolve(err as Error, h);
    }
  }
}

export default GetBalanceAction;
