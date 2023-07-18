const { Router } = require("express");
require("dotenv").config();

const { createDetailOrder } = require("../controllers/postDetailOrder.js");
const {
  getById,
  getDetailOrderByProperties,
} = require("../controllers/getAllDetailOrders.js");

const detailorders = Router();

detailorders.get("/", getDetailOrderByProperties);
detailorders.get("/:id", getById);
detailorders.post("/create", createDetailOrder);

module.exports = detailorders;
