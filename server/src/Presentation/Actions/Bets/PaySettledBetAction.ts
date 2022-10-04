import PaySettledBetHandler from "../../../Application/Commands/Handler/Bets/PaySettledBetHandler";
import BaseAction from "../BaseAction";
import {Request, ResponseObject, ResponseToolkit} from "@hapi/hapi";
import PaySettledBetCommand from "../../../Application/Commands/Command/Bets/PaySettledBetCommand";
import Uuid from "../../../Domain/ValueObjects/Uuid";

class PaySettledBetAction extends BaseAction{

  constructor(
    private handler: PaySettledBetHandler
  ) {
    super();
  }

  METHOD: "POST" = 'POST';
  ROUTE_PATH: string = '/bets/pay';

  async run(request: Request, h: ResponseToolkit): Promise<ResponseObject> {

    const body = request.payload as any;

    const command = new PaySettledBetCommand(new Uuid(body.id))

    try {

      await this.handler.execute(command);
    } catch (err) {
      console.error(err);
    }

    return h.response().code(204);
  }

}
export default PaySettledBetAction;
