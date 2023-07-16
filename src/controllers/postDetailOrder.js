require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const { Detailorder, Product, User } = require("../db");

const createDetailOrder = async (req, res, next) => {
  const detailOrders = req.body;

  try {
    const createdDetailOrders = [];

    for (const detail of detailOrders) {
      const { quantity, productId, userId } = detail;

      const user = await User.findByPk(userId);
      const product = await Product.findByPk(productId);

      if (!user || !product) {
        console.log("User or Product was not found.");
        return res
          .status(404)
          .json({ message: "User or Product was not found" });
      }

      const createdDetailOrder = await Detailorder.create({
        price: product.price,
        quantity,
        order_detail_date: new Date(),
        detail_order_status: "active",
        userId,
        productId,
      });

      createdDetailOrders.push(createdDetailOrder.detail_id);
    }

    console.log("Detail Orders created:", createdDetailOrders);
    res.status(200).json({
      message: "Detail Orders created",
      detailOrders: createdDetailOrders,
    });
  } catch (error) {
    console.log("Error al crear los Detail Orders:", error);
    next(error);
  }
};

module.exports = {
  createDetailOrder,
};
