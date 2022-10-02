import BaseAction from "../BaseAction";
import {Request, ResponseObject, ResponseToolkit} from "@hapi/hapi";
import SettleBetResultCommand from "../../../Application/Commands/Command/Bets/SettleBetResultCommand";
import Uuid from "../../../Domain/ValueObjects/Uuid";
import BetResult from "../../../Domain/ValueObjects/BetResult";
import SettleBetResultHandler from "../../../Application/Commands/Handler/Bets/SettleBetResultHandler";

class SettleBetResultAction extends BaseAction {
  METHOD: "PUT" = 'PUT';
  ROUTE_PATH: string = '/bets/{id}/result';

  constructor(private handler: SettleBetResultHandler) {
    super();
  }

  async run(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
    const {id} = request.params;
    const body = request.payload as any;

    const command = new SettleBetResultCommand(new Uuid(id), new BetResult(body.result))

    await this.handler.execute(command);

    return h.response().code(200);
  }
}

export default SettleBetResultAction;
