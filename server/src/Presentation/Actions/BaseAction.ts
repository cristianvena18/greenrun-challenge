abstract class BaseAction {
  abstract METHOD: 'POST' | 'PUT' | 'DELETE' | 'GET';
  abstract ROUTE_PATH: string;
  abstract run(request: any, h: any): Promise<void>;
}

export default BaseAction;
