const config = {
  database: 'mason',
  username: 'root',
  password: '050116',
  host: '127.0.0.1',
  port: 3306,
  dialect:'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
};

module.exports = config;

// const sequelize = new Sequelize(config.database, config.username, config.password, {
//   host: config.host,
//   dialect: 'mysql',
//   pool: {
//     max: 5,
//     min: 0,
//     idle: 30000
//   }
// });

