import BaseAction from "../BaseAction";
import CreateBetCommand from "../../../Application/Commands/Command/Bets/CreateBetCommand";
import {Request, ResponseToolkit} from "@hapi/hapi";
import Money from "../../../Domain/ValueObjects/Money";
import CreateBetHandler from "../../../Application/Commands/Handler/Bets/CreateBetHandler";
import {ErrorHandler} from "../../Utils/ErrorHandler";

class CreateBetAction extends BaseAction {

  METHOD: "POST" = 'POST';
  ROUTE_PATH: string = '/bets';

  constructor(private handler: CreateBetHandler) {
    super();
  }

  async run(request: Request, h: ResponseToolkit): Promise<any> {
    const body = request.payload as any;
    try {
    const command = new CreateBetCommand(
      body.option,
      body.sport,
      body.name,
      body.eventId,
      body.odd
    );

    await this.handler.execute(command);

    } catch (err) {
      return ErrorHandler.resolve(err as Error, h);
    }

    return h.response().code(200);
  }
}

export default CreateBetAction;
