import {MysqlConfig} from "./MysqlConfigFactory";
import knex, {Knex} from "knex";
import {Nullable} from "../../../Domain/ValueObjects/Nullable";


class MysqlConnectionFactory {
  private static clients: { [key: string]: Knex } = {};

  static async createClient(
    config: MysqlConfig
  ): Promise<Knex> {
    let client = MysqlConnectionFactory.getClient('default');

    if (!client) {
      client = await MysqlConnectionFactory.createAndConnectClient(config);

      MysqlConnectionFactory.registerClient(client, 'default');
    }

    return client;
  }

  private static getClient(contextName: string): Nullable<Knex> {
    return MysqlConnectionFactory.clients[contextName];
  }

  private static async createAndConnectClient(
    config: MysqlConfig
  ): Promise<Knex> {
    const client = knex({
      client: 'mysql',
      connection: {
        host: config.hostname,
        port: config.port,
        user: config.username,
        password: config.password,
        database: config.database
      },
      migrations: {
        tableName: 'migrations',
      }
    });

    return client;
  }

  private static registerClient(
    client: Knex,
    contextName: string
  ): void {
    MysqlConnectionFactory.clients[contextName] = client;
  }
}

export default MysqlConnectionFactory;
