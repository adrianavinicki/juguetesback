const { Router } = require("express");
const { createPayment } = require("../controllers/postPayment");
const { getAllPayments } = require("../controllers/getAllPayments");
//const { modifyOrder } = require("../controllers/putOrder");

const payments = Router();

payments.get("/", getAllPayments);
payments.post("/generate", createPayment);
//orders.put("/update/:id", modifyOrder);
//orders.get("/:id", getOrderById);

module.exports = payments;
