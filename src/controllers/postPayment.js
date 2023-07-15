const { Payment, Order } = require("../db");
const { onlyDateCheck } = require("../helpers/validation");

require("dotenv").config();
const {
  ACCESS_TOKEN,
  FRONT_URL_SUCCESS,
  FRONT_URL_PENDING,
  FRONT_URL_FAILED,
  BACK_URL_SUCCESS,
  BACK_URL_FAILED,
  BACK_URL_PENDING,
  PORT,
} = process.env;

const mercadopago = require("mercadopago");

//  Agrega credenciales
mercadopago.configure({
  access_token: ACCESS_TOKEN,
});

const createPayment = async (req, res, next) => {
  const { orderId } = req.body;
  console.log("este es el body :", req.body);
  try {
    // Verificar si la orden existe
    const order = await Order.findByPk(orderId);
    console.log("esta es la order:", order);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    const totalprice = parseFloat(order.dataValues.totalprice);
    const preference = {
      items: [
        {
          title: "Total Order",
          unit_price: totalprice,
          quantity: 1,
        },
      ],
      back_urls: {
        success: BACK_URL_SUCCESS,
        failed: BACK_URL_FAILED,
      },
      auto_return: "approved",
      // binary_mode: true,
      // notification_url:
      //   "https://",
      // //"https://",
    };

    console.log("esta es la preferencia: ", preference);
    // Crear el objeto de pago en Mercado Pago
    const response = await mercadopago.preferences.create(preference);
    console.log("este es el payment :", response);
    const { id, init_point } = response.body;
    // Crear el registro del pago en la base de datos

    const newPayment = await Payment.create({
      order_date: new Date(), // Fecha de creación del pago
      total_order: totalprice, // Total de la orden
      payment_status: "approved", // Estado del pago
      id_payment: id.replace(/["-]/g, ""),
      active: true, // Estado activo del pago
    });
    console.log(" este es el newPayment :", newPayment);
    // Asociar el pago a la orden
    await order.update({ paymentId: newPayment.id });
    console.log("esta es la order actualizada: ", order);
    await newPayment.update({ orderId: order.id, userId: order.userId });
    console.log("este es el pago updated 1: ", newPayment);

    /*const paymentId = response.body.id;
    const payment = await mercadopago.payment.findById(paymentId);
    await newPayment.update({
      orderId: order.id,
      userId: order.userId,
      date_approved: payment.body.date_approved,
      authorization_code: payment.body.authorization_code,
      mp_id_order: payment.body.order.id,
      fee_mp: payment.body.fee_details[0].amount,
    });
    console.log(" payment updated :", newPayment);*/
    return res.status(200).json({ message: "Payment created", init_point });
  } catch (error) {
    console.error("Payment was not created", error);
    return res.status(500).json({ message: "Payment was not created" });
  }
};

async function paymentNotification(req, res) {
  const { body } = req;
  const topic = body.topic || body.type;

  switch (topic) {
    case "payment":
      const paymentId = body.id || body["data.id"];
      const payment = await mercadopago.payment.findById(paymentId);
      const idS = payment.body.additional_info.items.map((e) => e.id);
      await updatePaymentData(payment.body);
      break;
    default:
      break;
  }
  res.send();
}

module.exports = { createPayment };
/*
//!GET purchase
const getAllBills = async (req, res) => {
  try {
    const allBills = await Bills.findAll({ include: User });
    res.status(200).send(allBills);
  } catch (e) {
    res.status(404).json(e);
  }
};

//!! Desactiva Bills
// De esta manera, cuando un administrador desactiva una factura,
//se cambia el valor de la columna active a false en lugar
//de borrar la factura de la base de datos.
const desactivaBill = async (req, res) => {
  const { id } = req.params;
  try {
    const bill = await Bills.findOne({ where: { id } });
    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }
    let active = bill.active;
    if (active === true) {
      await bill.update({ active: false });
      console.log(`Update the bills id: ${id} `);
    }
    if (active === false) {
      await bill.update({ active: true });
      console.log(`Update the bills id: ${id} `);
    }
    return res.status(204).json({ message: `Update the bills ${id} ` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//!!
const searchBills = async (req, res) => {
  try {
    const { email, status, id_payment } = req.query;
    let where = {};
    if (email) {
      where = {
        ...where,
        "$user.email$": {
          [Op.iLike]: `%${email}%`,
        },
      };
    }
    if (status) {
      where = {
        ...where,
        payment_status: status,
      };
    }
    if (id_payment) {
      where = {
        ...where,
        id_payment,
      };
    }
    const bills = await Bills.findAll({
      where,
      include: {
        model: User,
        as: "user",
        attributes: ["email", "first_name", "last_name"],
      },
    });
    res.json({ bills });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//!!!
module.exports = {
  postNewBills,
  getAllBills,
  paymentNotification,
  desactivaBill,
  searchBills,
};*/
