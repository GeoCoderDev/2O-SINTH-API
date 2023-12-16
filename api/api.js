const express = require('express');
const {isAuthenticated} = require("./auth/index");

// Importando los Routers
const {authRouter} = require("./routes/Auth");
const usersRouter = require("./routes/Users");
const presetsRouter = require("./routes/Presets");
const effectsRouter = require("./routes/Effects");
const melodiesRouter = require("./routes/Melodies");
const rhythmsRouter = require("./routes/Rhythms");

const API = express.Router();

API.use('/auth' ,authRouter);
API.use("/users", isAuthenticated, usersRouter);
API.use("/presets", isAuthenticated, presetsRouter)
API.use("/effects", isAuthenticated, effectsRouter);
API.use("/melodies", isAuthenticated, melodiesRouter);
API.use('/rhythms', isAuthenticated, rhythmsRouter)

module.exports = API;