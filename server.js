
// Importar express    
const express = require('express');
const API = require("./api/api");
const body_parser = require('body-parser');
const cors = require('cors');
const methodOverride = require('method-override');
const morgan = require('morgan');
const sequelize = require("./api/config/database");
const port = process.env.PORT || 3000;


// Crear aplicación
const app = express();

// Cadena de Middlewares
app.use(morgan('dev')); // Logging de desarrollo
app.use(body_parser.urlencoded({ extended: false })); // Parsea las solicitudes con cuerpo x-www-form-urlencoded
app.use(body_parser.json()); // Parsea las solicitudes con cuerpo JSON
app.use(cors()); // Configuración básica para permitir solicitudes desde cualquier origen
app.use(methodOverride()); // Soporte para HTTP method override
app.use(methodOverride('X-HTTP-Method-Override')); // Soporte adicional para HTTP method override

// Haciendo uso de la API 
app.use('/api', API);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;

// Sincronizando ORM con Base de Datos
sequelize.sync()
    .then(()=>{
        console.log("Se logro la sincronizacion");
    })
    .catch((e)=>{
        console.log(e);
    })

app.listen(PORT);
