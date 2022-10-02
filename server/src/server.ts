import Router from "./Presentation/Router";
import {container} from "./Infrastructure/DependencyInjection";
import Hapi from '@hapi/hapi';
import config from 'config';
import {ContainerBuilder} from "node-dependency-injection";

class Server {
  private router!: Router;
  private server: Hapi.Server;
  private container!: ContainerBuilder;

  constructor() {

    this.server = Hapi.server({
      port: config.get('server.port'),
      host: config.get('server.host'),
    });
  }

  public async init(): Promise<void> {
    this.container = await container();
    this.router = this.container.get('Shared.Router') as Router;
    this.container.get('Shared.DatabaseConnection');
    this.loadRoutes();

    await this.server.start();
    console.log('Server running on %s', this.server.info.uri);
  }

  private loadRoutes() {

    this.server = this.router.setUpRoutes(this.server);
  }
}

export default Server;
