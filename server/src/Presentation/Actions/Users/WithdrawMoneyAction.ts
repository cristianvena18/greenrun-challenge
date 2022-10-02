import BaseAction from "../BaseAction";
import {Request, ResponseObject, ResponseToolkit} from "@hapi/hapi";
import WithdrawMoneyCommand from "../../../Application/Commands/Command/Users/WithdrawMoneyCommand";
import Money from "../../../Domain/ValueObjects/Money";
import Uuid from "../../../Domain/ValueObjects/Uuid";
import WithdrawMoneyHandler from "../../../Application/Commands/Handler/Users/WithdrawMoneyHandler";

class WithdrawMoneyAction extends BaseAction {
  METHOD: "PUT" = 'PUT';
  ROUTE_PATH: string = '/users/{id}/withdraw';

  constructor(
    private handler: WithdrawMoneyHandler,
  ) {
    super();
  }

  async run(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
    const {id} = request.params;

    const body = request.payload as any;

    const command = new WithdrawMoneyCommand(Money.fromPrimitives(body.amount), new Uuid(id));

    try {
      await this.handler.execute(command);
    } catch (err) {
      console.error(err);
    }

    return h.response().code(200);
  }
}

export default WithdrawMoneyAction;
