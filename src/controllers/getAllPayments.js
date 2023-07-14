require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const { Payment, Order, User } = require("../db");

//!GET payments
const getAllPayments = async (req, res) => {
  try {
    const allPayments = await Payment.findAll({
      include: [{ model: Order }, { model: User }],
    });
    res.status(200).send(allPayments);
  } catch (e) {
    res.status(404).json(e);
  }
};

module.exports = { getAllPayments };
