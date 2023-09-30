const { Router } = require("express");
const {
  createPayment,
  paymentNotification,
} = require("../controllers/postPayment");
const { getAllPayments } = require("../controllers/getAllPayments");
//const { modifyOrder } = require("../controllers/putOrder");

const payments = Router();

payments.get("/", getAllPayments);
payments.post("/generate", createPayment);
payments.post("/notification", paymentNotification);

module.exports = payments;
