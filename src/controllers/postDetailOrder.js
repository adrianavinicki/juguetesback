require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const { Detailorder, Product, User } = require("../db");

const createDetailOrder = async (req, res, next) => {
  // Obtener el usuario que creó la detailorder
  //const userId = User.id;

  // Obtener el producto relacionado
  //const productId = Product.id;
  const { price, quantity, productId, userId } = req.body;

  // Crear la detailorder

  //async function createDetailOrder() {
  try {
    const user = await User.findByPk(userId);
    console.log("este esel usuario:", user);
    const product = await Product.findByPk(productId);
    console.log("este esel product:", product);
    if (!user || !product) {
      console.log("No se encontró el usuario o el producto.");
      return;
    }

    const detailOrder = await Detailorder.create({
      price: product.price, // Utilizar el precio del producto
      quantity,
      order_detail_date: new Date(),
      detail_order_status: "active",
      userId: user.id, // Relacionar la detailorder con el usuario
      productId: product.id, // Relacionar la detailorder con el producto
    });

    console.log("Detailorder creada:", detailOrder);
    res.status(200).json({ message: "Detail Order created" });
  } catch (error) {
    console.log("Error al crear la detailorder:", error);
    next(error);
  }
};

module.exports = {
  createDetailOrder,
};
