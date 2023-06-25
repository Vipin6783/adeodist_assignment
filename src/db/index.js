import Sequelize from "sequelize";

import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
  USE_SSL,
  dbDialect,
  dialectOptions,
  dbConnectionPool,
} from "../config";

import initModels from "../models/init-models";

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  ssl: USE_SSL,
  dialect: dbDialect,
  host: DB_HOST,
  port: DB_PORT,
  dialectOptions,
  pool: dbConnectionPool,
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log(
      ">>>>>>>> Connection has been established successfully with MySQL database. >>>>>>>>"
    );
  })
  .catch(() => {
    console.log(">>>>>>>> Unable to connect with MySQL database. >>>>>>>>");
  });

const Models = initModels(sequelize);

// (async () => {
//   try {
//     await sequelize.sync();
//     console.log(`Database & tables created!`);
//   } catch (err) {
//     console.log('Error in models --- \n', err);
//   }
// })();

export default Models;
