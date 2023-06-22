const { Router } = require("express");
require("dotenv").config();

const { createDetailOrder } = require("../controllers/postDetailOrder.js");
const {
  //getDetailOrdersByProperties,
  getDetailOrder,
} = require("../controllers/getAllDetailOrders.js");

const detailorders = Router();

detailorders.get("/", getDetailOrder /*getDetailOrdersByProperties*/);
/*users.get("/:id", getUserById);
users.put("/disable", disableUser);
users.put("/changeRole", changeRole);
users.put("/enable", enableUser);
users.get("/findAdmin/:id", isAdmin);
users.put("/changePassword", changePassword);
users.delete("/delete", deleteUser);
users.post("/passwordReset", passwordReset);
users.put("/passwordChange", passwordChange);*/

detailorders.post("/create", createDetailOrder);

module.exports = detailorders;
