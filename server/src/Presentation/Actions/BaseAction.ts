import {Request, ResponseObject, ResponseToolkit} from "@hapi/hapi";

abstract class BaseAction {
  abstract METHOD: 'POST' | 'PUT' | 'DELETE' | 'GET';
  abstract ROUTE_PATH: string;
  abstract run(request: Request, h: ResponseToolkit): Promise<ResponseObject>;
}

export default BaseAction;
