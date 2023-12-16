
const PropertiesReader = require("properties-reader");
const {Sequelize} = require("sequelize");

const path = require("path");
const propertiesPath = path.join(__dirname, "db.properties");
const properties = PropertiesReader(propertiesPath);

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);


module.exports = sequelize;
