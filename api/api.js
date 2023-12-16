const express = require('express');
const path = require('path');
const { isAuthenticated } = require(path.join(__dirname, "auth", "index.js"));

// Importing the Routers
const authRouter = require(path.join(__dirname, "routes", "Auth"));
const usersRouter = require(path.join(__dirname, "routes", "Users"));
const presetsRouter = require(path.join(__dirname, "routes", "Presets"));
const effectsRouter = require(path.join(__dirname, "routes", "Effects"));
const melodiesRouter = require(path.join(__dirname, "routes", "Melodies"));
const rhythmsRouter = require(path.join(__dirname, "routes", "Rhythms"));

const API = express.Router();

API.use('/auth', authRouter);
API.use("/users", isAuthenticated, usersRouter);
API.use("/presets", isAuthenticated, presetsRouter);
API.use("/effects", isAuthenticated, effectsRouter);
API.use("/melodies", isAuthenticated, melodiesRouter);
API.use('/rhythms', isAuthenticated, rhythmsRouter);

module.exports = API;
