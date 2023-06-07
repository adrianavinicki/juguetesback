
const { Router } = require("express");
require("dotenv").config();


const {
  getAllUsers,
  banUser,
  unBanUser,
  modifyRole,
  passwordChange,
  deleteUser,
  passwordReset,
  
} = require("../controllers/getAllUsers.js");
const{createUser} = require("../controllers/PostUsers.js")

const users = Router();

//Valida que el usuario exista, o que la sesion no haya terminado
  
  users.get("/", getAllUsers)
  users.put("/banUser", banUser)
  users.put("/modifyRole", modifyRole)
  users.put("/unbanUser", unBanUser)
  users.delete("/deleteUser", deleteUser)
  users.post("/passwordReset", passwordReset)
  users.put("/passwordChange", passwordChange);



  users.post("/createUser", createUser)
  
module.exports = users;
