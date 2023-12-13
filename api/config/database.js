
const mysql = require("mysql");
const PropertiesReader = require("properties-reader");
const properties = PropertiesReader("./db.properties");

const conexion = mysql.createConnection({
  host: properties.get("db.host"),
  user: properties.get("db.user"),
  password: properties.get("db.password"),
  database: properties.get("db.database"),
});

conexion.connect((error)=>{
    if(error){
        console.log(`Ocurrio un error: ${error}`)
    }else{
        console.log('Conexión a la base de datos establecida');
    }
});


// Ejemplo de consulta
conexion.query("SELECT * FROM Usuarios", (error, results, fields) => {
    if (error) {
      console.error("Error en la consulta:", error);
    } else {
      console.log("Resultados de la consulta:", results);
    }
  
    conexion.end(); // Cierra la conexión después de la consulta
});