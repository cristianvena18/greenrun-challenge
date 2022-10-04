import BaseAction from "../BaseAction";
import {Request, ResponseObject, ResponseToolkit} from "@hapi/hapi";
import PlaceBetCommand from "../../../Application/Commands/Command/Bets/PlaceBetCommand";
import Uuid from "../../../Domain/ValueObjects/Uuid";
import Money from "../../../Domain/ValueObjects/Money";
import PlaceBetHandler from "../../../Application/Commands/Handler/Bets/PlaceBetHandler";
import {ErrorHandler} from "../../Utils/ErrorHandler";

class PlaceBetAction extends BaseAction {
  METHOD: "POST" = 'POST';
  ROUTE_PATH: string = '/bets/{id}/place';

  constructor(private handler: PlaceBetHandler) {
    super();
  }

  async run(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
    const {id} = request.params;
    const body = request.payload as any;

    const command = new PlaceBetCommand(
      // TODO change for current user
      new Uuid(body.userId),
      Money.fromPrimitives(body.amount),
      new Uuid(id),
    );

    try {
      await this.handler.execute(command);
    } catch (err) {
      return ErrorHandler.resolve(err as Error, h);
    }

    return h.response().code(200);
  }
}

export default PlaceBetAction;
