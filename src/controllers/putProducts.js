require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const cloudinary = require("cloudinary").v2;
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

const { Product } = require("../db");
const { onlyNumbersCheck } = require("../helpers/validation.js");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Modificar un Producto

const putProduct = async (req, res, next) => {
  const {
    name,
    brand,
    category,
    minimun_age,
    description,
    quantity,
    price,
    image,
    product_status,
  } = req.body;
  console.log("este es el body: ", req.body);
  const { id } = req.params;
  console.log("este es el id: ", req.params);
  try {
    const product = await Product.findByPk(id);
    console.log("este es el producto en db: ", product);
    if (!product) res.status(404).json({ message: "Product does not exist" });
    const productModified = await product.update({
      name,
      brand,
      category,
      minimun_age,
      description,
      quantity,
      price,
      image,
      product_status,
    });
    console.log("este modificado: ", productModified);
    if (productModified) res.status(201).json({ message: "Product modified" });
  } catch (error) {
    res.status(404).json(error.message);
  }
};

//Desactivacion y Activacion de Productos
const newStatusProduct = async (req, res, next) => {
  const { id } = req.params;
  console.log("este es el params: ", req.params);
  try {
    const product = await Product.findByPk(id);
    console.log("este es el product: ", product);
    console.log("este es el status:", product.product_status);
    product.product_status === true
      ? await product.update({
          product_status: false,
        })
      : await product.update({
          product_status: true,
        });
    res.status(201).json({ message: "Product status changed" });
  } catch (error) {
    res.status(404).json(error.message);
  }
};

module.exports = { putProduct, newStatusProduct };
