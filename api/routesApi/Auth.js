const express = require("express");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const authRouter = express.Router();
const { isAuthenticated, PrivateKey } = require("../auth/index");

const EXPIRATION_TOKEN_DAYS = 365;
const EXPIRATION_TOKEN_HOURS = 24;

/**
 *
 * @param {Number} id
 * @returns
 */
const signToken = (id) => {
  return jwt.sign({ Id: id }, PrivateKey, {
    expiresIn:
      60 *
      60 *
      EXPIRATION_TOKEN_HOURS *
      (EXPIRATION_TOKEN_DAYS === 0 ? 1 : EXPIRATION_TOKEN_DAYS),
  });
};

// CONTROLADORES DE MODELOS ORM
const {
  createUser,
  getUserById,
  findOneUserByNameOrEmail,
} = require("../controllers/User");

const iterations = 10000;
const lenKey = 32;
const digest = "sha256";
const saltLengthBytes = 16;

authRouter.post("/register", (req, res) => {
  const { Name, Email, Password } = req.body;

  if(Name?.length>20) return res.status(400).send('Username too long(length must be less than 20)');    
  if(Email?.length>40) return res.status(400).send("Email too long(length must be less than 40)");
  if(Password?.length>20) return res.status(400).send("Password too long(length must be less than 20)");

  crypto.randomBytes(saltLengthBytes, (err, salt) => {
    // Internal Server Error
    if (err) {
      return res.status(500).send(err);
    }

    const newSalt = salt.toString("base64");

    crypto.pbkdf2(Password, newSalt, iterations, lenKey, digest, (err, key) => {
      if (err) {
        res.status(500);
        return console.log(err);
      }

      const encryptedPassword = key.toString("base64");

      findOneUserByNameOrEmail(Name, Email)        
        .then((userData) => {
          let user = userData.toJSON();
          if (user) {
            if (user.Name === Name) return res.status(409).send("NAME");
            if (user.Email === Email) return res.status(409).send("EMAIL");
          }

          createUser({
            Name: Name,
            Email: Email,
            Password: encryptedPassword,
            Salt: newSalt,
          })
            .then(() => {
              res.status(201).send("User Created!");
            })
            .catch(() => {
              res.status(500).send("Could not create user");
            });
        })
        .catch((err) => {
          res.status(500);
          console.log(err);
        });
    });
  });
});

// authRouter.post("/register", async (req, res) => {
//   const { Name, Email, Password } = req.body;

//   try {
//     const user = await findOneUserByNameOrEmail(Name, Email);

//     if (user) {
//       if (user.Name === Name) {
//         return res.status(409).send("Nombre de usuario ya existe");
//       }
//       if (user.Email === Email) {
//         return res.status(409).send("Correo electrónico ya registrado");
//       }
//     }

//     crypto.randomBytes(saltLengthBytes, (err, salt) => {
//       if (err) {
//         return res.status(500).send(err.message);
//       }

//       const newSalt = salt.toString("base64");

//       crypto.pbkdf2(Password, newSalt, iterations, lenKey, digest, async (err, key) => {
//         if (err) {
//           return res.status(500).send(err.message);
//         }

//         const encryptedPassword = key.toString("base64");

//         try {
//           await createUser({
//             Name: Name,
//             Email: Email,
//             Password: encryptedPassword,
//             Salt: newSalt,
//           });

//           res.status(201).send("Usuario creado exitosamente");
//         } catch (createError) {
//           res.status(500).send("No se pudo crear el usuario");
//         }
//       });
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error.message);
//   }
// });

authRouter.post("/login", (req, res) => {
  const { Name, Email, Password } = req.body;

  if(Name?.length>20) return res.status(400).send('Username too long(length must be less than 20)');    
  if(Email?.length>40) return res.status(400).send("Email too long(length must be less than 40)");
  if(Password?.length>20) return res.status(400).send("Password too long(length must be less than 20)");

  findOneUserByNameOrEmail(Name, Email).then((userFound) => {
    if (!userFound) return res.status(401).send("INCORRECT_USERNAME_OR_EMAIL");

    crypto.pbkdf2(
      Password,
      userFound.Salt,
      iterations,
      lenKey,
      digest,
      (err, key) => {
        if (err) {
          res.status(500);
          return console.log(err);
        }

        

        const encryptedPassword = key.toString("base64");

        if (userFound.Password === encryptedPassword) {
          const token = signToken(userFound.Id);
          return res.status(200).send({ token });
        } else {
          return res.status(401).send("INCORRECT_PASSWORD");
        }
      }
    );
  });
});

authRouter.get("/me", isAuthenticated, (req, res) => {
  const { Name, Email } = req.body.userData;
  res.status(200).send({ Name, Email });
});

module.exports = authRouter;
