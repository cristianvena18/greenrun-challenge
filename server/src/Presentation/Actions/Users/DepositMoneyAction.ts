import BaseAction from "../BaseAction";
import {Request, ResponseToolkit} from "@hapi/hapi";
import DepositMoneyCommand from "../../../Application/Commands/Command/Users/DepositMoneyCommand";
import Uuid from "../../../Domain/ValueObjects/Uuid";
import Money from "../../../Domain/ValueObjects/Money";
import DepositMoneyHandler from "../../../Application/Commands/Handler/Users/DepositMoneyHandler";
import {ErrorHandler} from "../../Utils/ErrorHandler";

class DepositMoneyAction extends BaseAction {
  METHOD: "POST" = 'POST';
  ROUTE_PATH: string = '/users/{id}/deposit';

  constructor(
    private handler: DepositMoneyHandler,
  ) {
    super();
  }

  async run(request: Request, h: ResponseToolkit): Promise<any> {
    const {id} = request.params;
    const {amount} = request.payload as any;

    const command = new DepositMoneyCommand(new Uuid(id), Money.fromPrimitives(amount))

    try {
      await this.handler.execute(command);
    } catch (err) {
      return ErrorHandler.resolve(err as Error, h);
    }

    return h.response().code(200);
  }
}

export default DepositMoneyAction;
