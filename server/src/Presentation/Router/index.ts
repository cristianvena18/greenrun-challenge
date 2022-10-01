import BaseAction from "../Actions/BaseAction";
import {Server} from '@hapi/hapi';

class Router {
  private actions: Array<BaseAction>;

  constructor(actions: Array<BaseAction>) {
    this.actions = actions;
  }

  public setUpRoutes(app: Server) {
    app.route(
      this.actions.map(action => ({
        method: action.METHOD,
        path: action.ROUTE_PATH,
        handler: action.run,
      })
    ));

    return app;
  }
}

export default Router;
