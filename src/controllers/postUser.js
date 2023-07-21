require("dotenv").config();
const jwt = require("jsonwebtoken")
const jwksClient = require("jwks-rsa")

const extractDecodedToken = (token) => {
  const client = jwksClient({
      jwksUri: `https://wondertoysworyfinal.us.auth0.com/.well-known/jwks.json`
  });
  function getKey(header, callback) {
      client.getSigningKey(header.kid, (err, key) => {
          if (err) {
              callback(err, undefined);
          } else {
              const signingKey = key.getPublicKey();
              callback(null, signingKey);
          }
      });
  }
  return new Promise((resolve, reject) => {
      jwt.verify(token, getKey, {
          issuer: `https://wondertoysworyfinal.us.auth0.com/`,
          algorithms: ['RS256']
      }, function(err, decoded) {
              if (err) {
                  console.log('token could not be decoded');
                  console.log(err);
                  reject(err)
              } else {
                  console.log(decoded.sub);
                  resolve(decoded)
              }
          })
  })
}

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME,
  TOKEN_AUTH0,
  GET_USER_AUTH0,
  POST_USER_AUTH0,
} = process.env;
const axios = require("axios");
const { User } = require("../db.js");

// Lo que hace esta ruta es:
// 1. Valida que estén todos los datos required del modelo en el body de la request.
// 2. Extrae el mail de auth0 de la request del usuario.
// 3. Busca en la base de datos a un usuario con el mail del punto 2. Si existe el usuario, responde con error.
// 4. Hace un create user en la db, le pasa valores que vienen en la request incluyendo el id de auth0. Responde exitosamente.
const createUser = async (req, res, next) => {
  console.log('///////////////////////////////Create User///////////////////////////')
  // // // 1. // // //
  const {
    first_name,
    last_name,
    gender,
    email,
    delivery_address,
    mobile,
    role_id,
    user_password,
  } = req.body;

  if (
    !first_name ||
    !last_name ||
    !gender ||
    !email ||
    !delivery_address ||
    !role_id ||
    first_name === "" ||
    last_name === "" ||
    email === "" ||
    delivery_address === ""
  )
  return res.status(400).send({ message: "fields can not be empty" });
  // // // // // // //

  // // // 2. // // //

  // /create?token=asdkfjhaskldfj
  const token = req.query.token
  if (!token) return res.status(400).send({ message: "Token in query cannot be empty" });

  let decoded_auth0_user = await extractDecodedToken(token)

  console.log("decoded", decoded_auth0_user)

  // // // // // // //

  // // // 3. // // //

  try {
    const existingUser = await User.findOne({ where: { auth0_id: decoded_auth0_user.sub} });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

  // // // // // // //

    // Crear el nuevo usuario
    const userCreated = await User.create({
      first_name,
      last_name,
      gender,
      email,
      delivery_address,
      mobile,
      role_id,
      user_password,
      auth0_id: decoded_auth0_user.sub
    });

    console.log("User creado correctamente:", userCreated);

    res.status(200).json({
      message: "User created",
      userID: userCreated.id,
    });
  } catch (error) {
    console.log(error);
    next(error);
    return res.status(500).json({ message: error });
  }
};

module.exports = {
  createUser,
};
