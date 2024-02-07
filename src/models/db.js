import { config } from "dotenv";
import { Sequelize } from "sequelize";

config();

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/clubs`, {
  logging: false,
  native: false,
  dialectOptions: {
    ssl: false,
  },
});


export default sequelize;
