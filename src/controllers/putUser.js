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
//const firebase = require("../firebase-config.js");

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

/*const changePassword = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return res.send("All data must be sent");
  try {
    const user = await User.findOne({
      where: { email },
    });
    if (user) {
      const uid = user.user_id;
      const newPassword = await firebase.auth().updateUser(uid, {
        password: password,
      });
      return res.send(newPassword);
    }
    return res.status(404).send("User not found");
  } catch (error) {
    next(error);
  }
};*/

// GUARDA CON ESTA FUNC QUE ROMPE EL BACK
/*const deleteUser = async (req, res, next) => {
  const { email } = req.query;

  try {
    const user = await User.findOne({
      where: { email },
    });
    if (user) {
      const uid = user.user_id;
      firebase
        .auth()
        .deleteUser(uid)
        .then(async () => {
          const deletedUser = await User.destroy({
            where: { email },
          });
          return res.send(deletedUser);
        });
    } else {
      return res.status(404).send("User not found");
    }
  } catch (error) {
    res.send({ message: error.message });
  }
};*/

/*const passwordReset = async (req, res, next) => {
  const { email } = req.body;
  if (!email) return res.send("Email must be sent");
  try {
    const linkReset = await firebase.auth().generatePasswordResetLink(email);
    res.send(linkReset);
  } catch (error) {
    next(error);
  }
};*/

module.exports = {
  disableUser,
  enableUser,
  changeRole,
  /*
  passwordChange,
  deleteUser,
  passwordReset,*/
};
