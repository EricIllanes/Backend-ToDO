require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false, // evita el log de la base de datos (mensajes de consolo sobre DROP, CREATE, etc)
    native: false,
  }
);

module.exports = {
    sequelize,
}
