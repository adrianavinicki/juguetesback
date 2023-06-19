const { Router } = require("express");
require("dotenv").config();

const {
  //userCheck,
  getUserById,
  getAllUsers,
  isAdmin,
} = require("../controllers/getAllUsers.js");
const {
  disableUser,
  enableUser,
  changeRole,
  /*
  passwordChange,
  deleteUser,
  passwordReset,*/
} = require("../controllers/putUser.js");
const { createUser } = require("../controllers/postUser.js");

const users = Router();

//Valida que el usuario exista, o que la sesion no haya terminado

users.get("/", getAllUsers);
users.get("/:id", getUserById);
users.put("/disable", disableUser);
users.put("/changeRole", changeRole);
users.put("/enable", enableUser);
users.get("/findAdmin/:id", isAdmin);
/*users.delete("/delete", deleteUser);
users.post("/passwordReset", passwordReset);
users.put("/passwordChange", passwordChange);*/

users.post("/create", createUser);

module.exports = users;
