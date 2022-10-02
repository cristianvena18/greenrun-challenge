import BaseAction from "../BaseAction";
import {Request, ResponseObject, ResponseToolkit} from "@hapi/hapi";
import ChangeBetStatusCommand from "../../../Application/Commands/Command/Bets/ChangeBetStatusCommand";
import Uuid from "../../../Domain/ValueObjects/Uuid";
import BetStatus from "../../../Domain/ValueObjects/BetStatus";
import ChangeBetStatusHandler from "../../../Application/Commands/Handler/Bets/ChangeBetStatusHandler";

class ChangeBetStatusAction extends BaseAction {
  METHOD: "PUT" = 'PUT';
  ROUTE_PATH: string = '/bets/{id}';

  constructor(
    private handler: ChangeBetStatusHandler
  ) {
    super();
  }

  async run(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
    const {id} = request.params;
    const body = request.payload as any;

    const command = new ChangeBetStatusCommand(new Uuid(id), new BetStatus(body.status))

    try{
      await this.handler.execute(command);
    } catch(err) {
      console.log(err);
    }

    return h.response().code(200)
  }
}

export default ChangeBetStatusAction;
