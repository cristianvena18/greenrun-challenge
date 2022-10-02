import {MysqlConfig} from "./MysqlConfigFactory";
import knex, {Knex} from "knex";
import {Nullable} from "../../../Domain/ValueObjects/Nullable";
import path from "path";


class MysqlConnectionFactory {
  private static clients: { [key: string]: Knex } = {};

  static createClient(
    config: MysqlConfig
  ): Knex {
    let client = MysqlConnectionFactory.getClient('default');

    if (!client) {
      client = MysqlConnectionFactory.createAndConnectClient(config);

      MysqlConnectionFactory.registerClient(client, 'default');
    }

    return client;
  }

  private static getClient(contextName: string): Nullable<Knex> {
    return MysqlConnectionFactory.clients[contextName];
  }

  private static createAndConnectClient(
    config: MysqlConfig
  ): Knex {
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
        directory: path.resolve(path.join(__dirname, '..', 'Migrations')),
      },
    });

    client.migrate.up({});

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
