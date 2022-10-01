import {config as dotenvConfig} from 'dotenv-safe';
import Router from "./Presentation/Router";
import {container} from "./Infrastructure/DependencyInjection";
import Hapi from '@hapi/hapi';
import config from 'config';

class Server {
  private router: Router;
  private server: Hapi.Server;

  constructor() {
    this.loadConfig();
    this.router = container().get('HTTP.Router') as Router;

    this.server = Hapi.server({
      port: config.get('server.port'),
      host: config.get('server.host'),
    });
  }

  public async init(): Promise<void> {
    await this.connectionDatabase();
    this.loadRoutes();


    await this.server.start();
    console.log('Server running on %s', this.server.info.uri);
  }

  private loadConfig() {
    dotenvConfig();
  }

  private async connectionDatabase() {

  }

  private loadRoutes() {

    this.server = this.router.setUpRoutes(this.server);
  }
}

export default Server;
