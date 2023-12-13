
// Importar express    
const express = require('express');
const API = require("./api/api");
const body_parser = require('body-parser');
const cors = require('cors');
const methodOverride = require('method-override');
const morgan = require('morgan');
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


app.listen(PORT);