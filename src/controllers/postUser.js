require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

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
    res.status(200).json({ message: "User created", userID: userCreated.id });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
};
