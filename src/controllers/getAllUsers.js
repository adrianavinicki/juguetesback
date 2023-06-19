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

const getUserById = async (req, res, next) => {
  const { id } = req.params;
  let checkUser = onlyNumbersCheck(id);
  if (checkUser !== true)
    return res.status(412).json({ message: "Invalid Input" });
  try {
    const userFindById = await User.findByPk(id);
    console.log("userFind: ", userFindById);
    userFindById
      ? res.status(200).json(userFindById)
      : res.status(404).json({ message: "The searched User Id is not found" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const usersResult = await User.findAll();
    res.status(200).json(usersResult);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const isAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (user.role_id === "Administrador") {
      return res.status(200).send({ isAdmin: true });
    } else {
      return res.status(200).send({ isAdmin: false });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  // userCheck,
  getUserById,
  getAllUsers,
  isAdmin,
};
