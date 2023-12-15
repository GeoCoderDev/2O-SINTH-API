
const PropertiesReader = require("properties-reader");
const {Sequelize} = require("sequelize");

const path = require("path");
const propertiesPath = path.join(__dirname, "db.properties");
const properties = PropertiesReader(propertiesPath);


const sequelize = new Sequelize(
  properties.get("db.database"),
  properties.get("db.user"),
  properties.get("db.password"),
  {
    host: properties.get("db.host"),
    dialect: "mysql",
  }
);


module.exports = sequelize;


// Ejemplo de consulta
// connection.query("SELECT * FROM Usuarios", (error, results, fields) => {
//     if (error) {
//       console.error("Error en la consulta:", error);
//     } else {
//       console.log("Resultados de la consulta:", results);
//     }
  
//     connection.end(); // Cierra la conexión después de la consulta
// });

// module.exports = connection;