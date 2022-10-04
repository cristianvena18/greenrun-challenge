import BaseAction from "../BaseAction";
import {Request, ResponseObject, ResponseToolkit} from "@hapi/hapi";
import GetTransactionsFilteredCommand
  from "../../../Application/Commands/Command/Transactions/GetTransactionsFilteredCommand";
import Uuid from "../../../Domain/ValueObjects/Uuid";
import TransactionCategory from "../../../Domain/ValueObjects/TransactionCategory";
import GetTransactionsFilteredHandler
  from "../../../Application/Commands/Handler/Transactions/GetTransactionsFilteredHandler";
import {ErrorHandler} from "../../Utils/ErrorHandler";

class GetTransactionsAction extends BaseAction {
  METHOD: "GET" = "GET";
  ROUTE_PATH: string = '/users/{id}/transactions';

  constructor(private handler: GetTransactionsFilteredHandler) {
    super();
  }

  async run(request: Request, h: ResponseToolkit): Promise<ResponseObject> {

    const filters = request.query;
    const {id} = request.params

    try {
      const command = new GetTransactionsFilteredCommand(
        new Uuid(id),
        filters.category ?
          new TransactionCategory(filters.category) :
          null
      );

      const result = await this.handler.execute(command);

      return h.response(result.map(transaction => transaction.toPrimitives())).code(200);
    } catch (e) {
      return ErrorHandler.resolve(e as Error, h);
    }
  }
}

export default GetTransactionsAction;
