require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const { Detailorder, Product, User } = require("../db");

const createDetailOrder = async (req, res, next) => {
  const { quantity, productId, userId } = req.body;

  // Crear la detailorder

  try {
    const user = await User.findByPk(userId);
    console.log("este esel usuario:", user);
    const product = await Product.findByPk(productId);
    console.log("este esel product:", product);
    if (!user || !product) {
      console.log("User or Product was not find.");
      return res.status(404).json({message: "producto ó usuario no existen"});
    }

    const detailOrder = await Detailorder.create({
      price: product.price, // Utilizar el precio del producto
      quantity,
      order_detail_date: new Date(),
      detail_order_status: "active",
      userId, // Relacionar la detailorder con el usuario
      productId, // Relacionar la detailorder con el producto
    });
 //podriamos mandar un array de las ids de las detail orders al front y estas se guarden en un estado global
    console.log("Detailorder creada:", detailOrder);
    res.status(200).json({ message: "Detail Order created", id: detailOrder.detail_id });
  } catch (error) {
    console.log("Error al crear la detailorder:", error);
    next(error);
  }
};

module.exports = {
  createDetailOrder,
};
