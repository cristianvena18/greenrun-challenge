import BaseAction from "../BaseAction";
import {Request, ResponseObject, ResponseToolkit} from "@hapi/hapi";
import GetBalanceCommand from "../../../Application/Commands/Command/Users/GetBalanceCommand";
import Uuid from "../../../Domain/ValueObjects/Uuid";
import GetBalanceHandler from "../../../Application/Commands/Handler/Users/GetBalanceHandler";

class GetBalanceAction extends BaseAction {
  METHOD: "GET" = "GET";
  ROUTE_PATH: string = '/users/{id}/balance';

  constructor(private handler: GetBalanceHandler) {
    super();
  }

  async run(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
    const {id} = request.params;

    const command = new GetBalanceCommand(new Uuid(id));

    const result = await this.handler.execute(command);

    return h.response({balance: result.getBalance()}).code(200)
  }
}

export default GetBalanceAction;
