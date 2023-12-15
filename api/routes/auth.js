const express = require("express");
const crypto = require("crypto");

const authRouter = express.Router();

// MODELOS ORM
const User = require("../models/User");


const iterations = 10000;
const longitudDeLlave = 32;


authRouter.post("/register", (req, res) => {
  const { nombre, email, password } = req.body;

  crypto.randomBytes(16,(err, salt)=>{
    // Error Interno del servidor
    if(err){ return res.status(500).send(err);}

    const newSalt = salt.toString("base64");

    crypto.pbkdf2(password, newSalt, iterations, longitudDeLlave,'sha256',(err, key)=>{
        if(err) return res.status(500).send(err);

        const encryptedPassword = key.toString("base64");
        

    })



  })

});

authRouter.post("/login", (req, res) => {});

module.exports = authRouter;
