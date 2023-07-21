require("dotenv").config();
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

const createUser = async (req, res, next) => {
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

  const uid = req.uid;

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

  try {
    // Consultar si ya existe un usuario con el mismo email
    let userRegistrado;
    //aqui verifica si el user existe en auth0
    const auth0Users = await axios.get(
      `${GET_USER_AUTH0}users-by-email?email=${email}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN_AUTH0}`,
        },
      }
    );

    if (auth0Users.data.length === 0) {
      //return res.status(400).json({ message: "User already exists in Auth0", usr: auth0Users.data });
      const auth0User = await axios.post(
        POST_USER_AUTH0,
        {
          connection: "Username-Password-Authentication",
          email,
          password: user_password,
          given_name: first_name,
          family_name: last_name,
          picture: "https://cdn.auth0.com/styleguide/1.0.0/img/badge.svg",
          // Add any additional user properties as needed
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN_AUTH0}`,
          },
        }
      );

      console.log("User created in Auth0:", auth0User.data);
      userRegistrado = auth0User.data;
    } else {
      console.log("user exists in auth0");
    }

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
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
    });
    console.log("User creado correctamente:", userCreated);
    res.status(200).json({
      message: "User created",
      userID: userCreated.id,
      auth0user: auth0Users.data,
      usuarioRegistrado: userRegistrado,
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
