
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
app.use(body_parser.urlencoded({extended:false}));
app.use(cors());
app.use(methodOverride());
app.use(methodOverride('X-HTTP-Method-Override')); 
app.use(body_parser.json());
app.use(morgan("dev"));

// Haciendo uso de la API 
app.use('/api', API);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;

// Sincronizando ORM con Base de Datos
sequelize.sync()
    .then(()=>{
        console.log("Le logro la sincronizacion");
    })
    .catch((e)=>{
        console.log(e);
    })

app.listen(PORT);

// const crypto = require("crypto");
// crypto.randomBytes(16,(err, salt)=>{
//     if(!err) console.log(salt.toString("base64"));
// })