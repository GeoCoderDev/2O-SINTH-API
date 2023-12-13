const express = require('express');

// Importando Rutas
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
// const effectsRouter = require("./routes/presets");
// const presetsRouter = require("./routes/presets");
// const rhythmsRouter = require("./routes/rhythms");

const API = express.Router();

API.use("/users", usersRouter);
API.use('/auth', authRouter);
// API.use("/effects", effectsRouter);
// API.use("/presets", presetsRouter);
// API.use('/rhythms', rhythmsRouter)

module.exports = API;