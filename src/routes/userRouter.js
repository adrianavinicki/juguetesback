const { Router } = require("express");
require("dotenv").config();

const {
  userCheck,
  getAllUsers,
  /*banUser,
  unBanUser,
  modifyRole,
  passwordChange,
  deleteUser,
  passwordReset,*/
} = require("../controllers/getAllUsers.js");
const { createUser } = require("../controllers/postUser.js");

const users = Router();

//Valida que el usuario exista, o que la sesion no haya terminado

users.get("/", getAllUsers);
users.get("/isUser", userCheck);
/*users.put("/ban", banUser);
users.put("/modifyRole", modifyRole);
users.put("/unban", unBanUser);
users.delete("/delete", deleteUser);
users.post("/passwordReset", passwordReset);
users.put("/passwordChange", passwordChange);*/

users.post("/create", createUser);

module.exports = users;
