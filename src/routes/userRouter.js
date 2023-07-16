const { Router } = require("express");
require("dotenv").config();

const {
  //userCheck,
  getUserById,
  getAllUsers,
  isAdmin,
  getUserByEmail,
} = require("../controllers/getAllUsers.js");
const {
  disableUser,
  enableUser,
  changeRole,
  changePassword,
  /*
  passwordChange,
  deleteUser,
  passwordReset,*/
} = require("../controllers/putUser.js");
const { createUser } = require("../controllers/postUser.js");
const { login } = require("../controllers/login.js");

const users = Router();

//Valida que el usuario exista, o que la sesion no haya terminado

users.get("/", getAllUsers);
users.get("/:id", getUserById);
users.put("/disable", disableUser);
users.put("/changeRole", changeRole);
users.put("/enable", enableUser);
users.get("/findAdmin/:id", isAdmin);
users.put("/changePassword", changePassword);
users.post("/userEmail", getUserByEmail);
users.post("/login", login);

/*users.delete("/delete", deleteUser);
users.post("/passwordReset", passwordReset);
users.put("/passwordChange", passwordChange);*/

users.post("/create", createUser);

module.exports = users;
