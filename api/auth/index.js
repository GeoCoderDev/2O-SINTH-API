const jwt = require("jsonwebtoken");
const { getUserById } = require("../controllers/User");
const PrivateKey = process.env.PRIVATE_KEY;
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
  if (!token)
    return res
      .status(403)
      .send({
        auth: false,
        message: "No Authorizated",
      });

  jwt.verify(token, PrivateKey, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).send({ auth: false, message: "Token expired" });
      }
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
