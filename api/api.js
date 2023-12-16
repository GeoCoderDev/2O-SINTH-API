const express = require('express');
const {isAuthenticated} = require("./api/auth/index");

// Importando los Routers
const {authRouter} = require("./api/routes/Auth");
const usersRouter = require("./api/routes/Users");
const presetsRouter = require("./api/routes/Presets");
const effectsRouter = require("./api//routes/Effects");
const melodiesRouter = require("./api/routes/Melodies");
const rhythmsRouter = require("./api/routes/Rhythms");

const API = express.Router();

API.use('/auth' ,authRouter);
API.use("/users", isAuthenticated, usersRouter);
API.use("/presets", isAuthenticated, presetsRouter)
API.use("/effects", isAuthenticated, effectsRouter);
API.use("/melodies", isAuthenticated, melodiesRouter);
API.use('/rhythms', isAuthenticated, rhythmsRouter)

module.exports = API;