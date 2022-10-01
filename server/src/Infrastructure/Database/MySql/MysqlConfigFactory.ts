import config from 'config';

export type MysqlConfig = {
  username: string;
  password: string;
  hostname: string;
  port: number;
  database: string;
}


class MysqlConfigFactory {
  public static createConfig(): MysqlConfig {
    return {
      username: config.get('mysql.username'),
      password: config.get('mysql.password'),
      hostname: config.get('mysql.hostname'),
      port: config.get('mysql.port'),
      database: config.get('mysql.database'),
    }
  }
}

export default MysqlConfigFactory;
