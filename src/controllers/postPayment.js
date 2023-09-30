const { Payment, Order, User, Detailorder, Product } = require("../db");
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
  BACK_URL_NOTIFICATION,
  PORT,
} = process.env;

const mercadopago = require("mercadopago");
const { updateProductQuantities } = require("./stockControllers");

//  Agrega credenciales
mercadopago.configure({
  access_token: ACCESS_TOKEN,
});

let idPaymentCreated;

const createPayment = async (req, res, next) => {
  const { orderId } = req.body;
  //console.log("este es el body :", req.body);
  try {
    // Verificar si la orden existe
    const order = await Order.findByPk(orderId);
    //console.log("esta es la order:", order);
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
      binary_mode: true,
      notification_url: `${BACK_URL_NOTIFICATION}/payments/notification`,
    };

    console.log("esta es la preferencia: ", preference);
    // Crear el objeto de pago en Mercado Pago
    const response = await mercadopago.preferences.create(preference);
    //console.log("este es el payment :", response);
    const { id, init_point } = response.body;
    // Crear el registro del pago en la base de datos

    const newPayment = await Payment.create({
      order_date: new Date(), // Fecha de creación del pago
      total_order: totalprice, // Total de la orden
      active: true, // Estado activo del pago
    });
    //console.log(" este es el newPayment :", newPayment);

    // Asociar el pago a la orden
    await order.update({ paymentId: newPayment.id });
    // console.log("esta es la order actualizada: ", order);
    await newPayment.update({ orderId: order.id, userId: order.userId });
    //console.log("este es el pago updated 1: ", newPayment);

    //obtengo usuario asociado al pago
    const user = await User.findByPk(newPayment.userId);

    //obtengo los productos de las details orders compradas
    const detailorders = await Detailorder.findAll({
      where: {
        orderId: order.id,
      },
      include: [Product],
    });

    //actualizo la variable idPaymentCreated
    idPaymentCreated = newPayment.id;

    //actualizo el campo purchase_history en user
    const currentPurchaseHistory = user.purchase_history;

    const updatedPurchaseHistory = detailorders.map((detailorder) => ({
      productId: detailorder.productId,
      price: detailorder.price,
      quantity: detailorder.quantity,
      date: detailorder.order_detail_date,
    }));

    const mergedPurchaseHistory = [
      ...currentPurchaseHistory,
      ...updatedPurchaseHistory,
    ];
    await user.update({
      purchase_history: mergedPurchaseHistory,
    });

    console.log("purchase_history:", user.purchase_history);

    return res.status(200).json({ message: "Payment created", init_point });
  } catch (error) {
    console.error("Payment was not created", error);
    return res.status(500).json({ message: "Payment was not created" });
  }
};

//------ DATOS A RECIBIR DE MERCADO PAGO SOBRE EL PAGO -----

async function paymentNotification(req, res) {
  const payment = req.query;

  try {
    if (payment.type === "payment") {
      const data = await mercadopago.payment.findById(payment["data.id"]);
      //console.log("Data body:", data.body);
      if (data.body.status === "rejected") {
        const rejectedPayment = await Payment.update(
          {
            date_approved: data.body.date_approved,
            mp_id_order: data.body.order.id,
            payment_status: "failed",
          },
          {
            where: {
              id: idPaymentCreated,
            },
          }
        );
        const failedPurchase = await Order.update(
          {
            order_status: "failed",
          },
          { where: { paymentId: idPaymentCreated } }
        );

        const updatedPurchaseInstance = await Order.findOne({
          where: { paymentId: idPaymentCreated },
        });
        const purchaseId = updatedPurchaseInstance.id;

        const updatedOrder = await Detailorder.update(
          {
            detail_order_status: "inactive",
          },
          { where: { orderId: purchaseId } }
        );
      } else {
        const updatedPayment = await Payment.update(
          {
            id_payment: data.body.id,
            date_approved: data.body.date_approved,
            authorization_code: data.body.authorization_code,
            mp_id_order: data.body.order.id,
            fee_mp: data.body.fee_details[0].amount,
            payment_status: data.body.status,
          },
          {
            where: {
              id: idPaymentCreated,
            },
          }
        );

        const callPurchase = await Order.findOne({
          where: { paymentId: idPaymentCreated },
        });
        console.log("callPurchase: ", callPurchase);

        const newDelivery = await Delivery.create({
          delivered_date: new Date(), // Fecha actual
          delivery_status: "delivered",
          orderId: callPurchase.id, // Utiliza el orderId del pago aprobado
          userId: callPurchase.userId, // Utiliza el userId del pago aprobado
        });

        const updatedPurchase = await Order.update(
          {
            order_status: "success",
            deliveryId: newDelivery.id,
          },
          { where: { paymentId: idPaymentCreated } }
        );

        // Llama al controlador para actualizar las cantidades de productos
        await updateProductQuantities(callPurchase.id);
      }
    }
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500).json({ error: error.message });
  }
}

module.exports = { createPayment, paymentNotification };
