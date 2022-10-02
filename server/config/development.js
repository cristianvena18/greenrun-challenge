const development = {

  server: {
    host: 'localhost',
    port: 3000,
  },
  mysql: {
    hostname: process.env.MYSQL_HOST,
    password: process.env.MYSQL_PASSWORD,
    username: process.env.MYSQL_USERNAME,
    port: 3306,
    database: process.env.MYSQL_DATABASE,
  }
}

module.exports = development;
