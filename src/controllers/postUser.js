require("dotenv").config();

const axios = require("axios");
const { User } = require("../db.js");

// Lo que hace esta ruta es:
// 1. Valida que estén todos los datos required del modelo en el body de la request.
// 2. Extrae el mail de auth0 de la request del usuario.
// 3. Busca en la base de datos a un usuario con el mail del punto 2. Si existe el usuario, responde con error.
// 4. Hace un create user en la db, le pasa valores que vienen en la request incluyendo el id de auth0. Responde exitosamente.
// const createUser = async (req, res, next) => {
//   console.log('///////////////////////////////Create User///////////////////////////')
//   // // // 1. // // //
//   const {
//     first_name,
//     last_name,
//     gender,
//     email,
//     delivery_address,
//     mobile,
//     role_id,
//     user_password,
//   } = req.body;

//   if (
//     !first_name ||
//     !last_name ||
//     !gender ||
//     !email ||
//     !delivery_address ||
//     !role_id ||
//     first_name === "" ||
//     last_name === "" ||
//     email === "" ||
//     delivery_address === ""
//   )
//   return res.status(400).send({ message: "fields can not be empty" });
//   // // // // // // //

//   // // // 2. // // //

//   // /create?token=asdkfjhaskldfj
//   const token = req.query.token
//   if (!token) return res.status(400).send({ message: "Token in query cannot be empty" });

//   let decoded_auth0_user = await extractDecodedToken(token)

//   console.log("decoded", decoded_auth0_user)

//   // // // // // // //

//   // // // 3. // // //

//   try {
//     const existingUser = await User.findOne({ where: { auth0_id: decoded_auth0_user.sub} });

//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//   // // // // // // //

//     // Crear el nuevo usuario
//     const userCreated = await User.create({
//       first_name,
//       last_name,
//       gender,
//       email,
//       delivery_address,
//       mobile,
//       role_id,
//       user_password,
//       auth0_id: decoded_auth0_user.sub
//     });

//     console.log("User creado correctamente:", userCreated);

//     res.status(200).json({
//       message: "User created",
//       userID: userCreated.id,
//     });
//   } catch (error) {
//     console.log(error);
//     next(error);
//     return res.status(500).json({ message: error });
//   }
// };
const createUser = async (req, res, next) => {
  console.log(
    "///////////////////////////////Create User///////////////////////////"
  );
  // // // 1. // // //
  const {
    first_name,
    last_name,
    gender,
    email,
    delivery_address,
    mobile,
    role_id,
    //user_password,
  } = req.body;

  if (
    !first_name ||
    !last_name ||
    !gender ||
    !email ||
    !delivery_address ||
    first_name === "" ||
    last_name === "" ||
    email === "" ||
    delivery_address === ""
  )
    return res.status(400).send({ message: "fields can not be empty" });

  try {
    // Crear el nuevo usuario
    const userCreated = await User.create({
      first_name,
      last_name,
      gender,
      email,
      delivery_address,
      mobile,
      role_id,
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

const getUserByMail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(412).json({ message: "email no recibido" });
  }

  try {
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(413).json({ message: "usuario no encontrado" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


module.exports = {
  createUser,
  getUserByMail,
};
