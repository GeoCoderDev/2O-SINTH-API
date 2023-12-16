const express = require('express');
const path = require('path');
const { isAuthenticated } = require(path.join(__dirname, "auth", "index.js"));

// Importing the Routers
const authRouter = require(path.join(__dirname, "routesApi", "Auth.js"));
const usersRouter = require(path.join(__dirname, "routesApi", "Users.js"));
const presetsRouter = require(path.join(__dirname, "routesApi", "Presets.js"));
const effectsRouter = require(path.join(__dirname, "routesApi", "Effects.js"));
const melodiesRouter = require(path.join(__dirname, "routesApi", "Melodies.js"));
const rhythmsRouter = require(path.join(__dirname, "routesApi", "Rhythms.js"));

const API = express.Router();

API.use('/auth', authRouter);
API.use("/users", isAuthenticated, usersRouter);
API.use("/presets", isAuthenticated, presetsRouter);
API.use("/effects", isAuthenticated, effectsRouter);
API.use("/melodies", isAuthenticated, melodiesRouter);
API.use('/rhythms', isAuthenticated, rhythmsRouter);

module.exports = API;
