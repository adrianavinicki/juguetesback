const { User } = require("../db.js");
const {
  onlyNumbersCheck,
  onlyLettersCheck,
  onlyLettersOrNumbersCheck,
} = require("../helpers/validation.js");
const {
  getRoleId,
  getUsersProperty,
  getUserId,
} = require("../helpers/uservalidation.js");

const disableUser = async (req, res) => {
  const { email } = req.body;

  try {
    await User.update(
      { user_status: false },
      {
        where: {
          email: email,
        },
      }
    );
    res.status(200).send({ message: "User is disabled" });
  } catch (err) {
    res.status(400).send({ message: err });
  }
};

const enableUser = async (req, res) => {
  const { email } = req.body;
  try {
    await User.update({ user_status: true }, { where: { email: email } });
    res.status(200).send({ message: "User is enabled" });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

const changeRole = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(404).send({ message: "User does not exist" });
    }

    const newRole = user.role_id === "Cliente" ? "Administrador" : "Cliente";

    await User.update({ role_id: newRole }, { where: { email: email } });

    res.status(200).send({ message: "User role was changed" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
// Cambio de password para los usuarios ingresados a la base sin auth0

const changePassword = async (req, res) => {
  const { email, newPassword } = req.body;
  console.log("esto ingresa: ", req.body);
  try {
    // Busca el usuario por su ID
    const user = await User.findOne({ where: { email: email } });
    console.log("este es user: ", user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Actualiza la contraseña del usuario--OJO REVISARLA X QUE NO FUNCIONA-NO INGRESA NADA AL UPDATE
    const userUpdated =
      user.user_password === newPassword ? newPassword : user_password;
    await User.update(
      { user_password: newPassword },
      { where: { email: email } }
    );
    console.log("user updated", userUpdated);
    return res.status(200).json({ message: "Password updated" });
  } catch (error) {
    console.error("Error al cambiar la contraseña:", error);
    return res.status(500).json({ error });
  }
};

module.exports = {
  disableUser,
  enableUser,
  changeRole,
  changePassword,
};
