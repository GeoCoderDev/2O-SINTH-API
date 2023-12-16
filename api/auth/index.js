const jwt = require("jsonwebtoken");
const { getUserById } = require("../controllers/User");
const PrivateKey = "2O-SINTH-SECRET";
const express = require("express");

/**
 * This middleware
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {Function} next
 * @returns
 */
const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization;

  // Denial of authorization
  if (!token) return res.status(403);

  jwt.verify(token, PrivateKey, (err, decoded) => {
    if (err) {
      console.log(err);
      return res
        .status(401)
        .send({ auth: false, message: "Failed to authenticate" });
    }

    const { Id } = decoded;

    getUserById(Id)
      .then((userFound) => {
        if (!userFound) return res.status(201).send("User not exist");
        req.body.userData = userFound;
        next();
      })
      .catch((err) => {
        res.status(500);
        console.log(err);
      });
  });
};

module.exports = {
  isAuthenticated,
  PrivateKey,
};
