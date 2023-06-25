require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const { Detailorder, Product, User } = require("../db");
const {
  onlyNumbersCheck,
  onlyLettersCheck,
  onlyLettersOrNumbersCheck,
} = require("../helpers/validation.js");
const {
  getDetailOrder,
  /*getProductByBrandAndStatus,
  getProductByBrand,
  getProductByNameAndStatus,
  getProductByName,
  getProductsByStatus,
  getProductsByCategory,
  getProductByCategoryAndStatus,*/
} = require("../helpers/detailordershelps");

// -----------xxxx-------------------------
// Traigo producto x id de mi base de datos

/*const getById = async (req, res, next) => {
  const { id } = req.params;
  let check = onlyNumbersCheck(id);
  if (check !== true) return res.status(412).json({ message: "Invalid Input" });
  try {
    const detailProduct = await Product.findByPk(id);
    detailProduct
      ? res.status(200).json(detailProduct)
      : res.status(404).json({ message: "The searched Product is not found" });
  } catch (error) {
    res.status(404).json(error.message);
  }
};*/

// -----------xxxx-------------------------
// Traigo todos los productos o si hay parametros x producto x categoria/marca/nombre y/o status de mi base de datos

/*const getDetailOrderByProperties = async (req, res, next) => {
  const { detail_id, price, quantity, order_detail_date , detail_order_status, productId, userId} = req.query;
  console.log("este es el query :", req.query);

  try {
    if (detail_id & detail_order_status) {
      if (typeof detail_order_status !== "active" || detail_order_status !== "inactive") {
        console.log("este es typeof status: ", typeof detail_order_status);
        return res.status(500).json({ message: "Invalid Input" });
      }
      let detail = await getProductByCategoryAndStatus(
        category,
        product_status
      );
      return products.length > 0
        ? res.status(200).json(products)
        : res.status(404).json({
            message: "there is no product with the category required",
          });
    }
    if (name & status) {
      if (typeof status !== "boolean") {
        console.log("este es typeof status: ", typeof status);
        return res.status(500).json({ message: "Invalid Input" });
      }
      let products = await getProductByNameAndStatus(name, product_status);
      return products.length > 0
        ? res.status(200).json(products)
        : res.status(404).json({
            message: "there is no product with the name required",
          });
    }
    if (brand & status) {
      if (typeof status !== "boolean") {
        console.log("este es typeof status: ", typeof status);
        return res.status(500).json({ message: "Invalid Input" });
      }
      let products = await getProductByBrandAndStatus(brand, product_status);
      return products.length > 0
        ? res.status(200).json(products)
        : res.status(404).json({
            message: "there is no product with the brand required",
          });
    }
    if (category) {
      let products = await getProductsByCategory(category);
      return products.length > 0
        ? res.status(200).json(products)
        : res.status(404).json({ message: "Category not found" });
    }
    if (name) {
      let products = await getProductByName(name);
      return products.length > 0
        ? res.status(200).json(products)
        : res.status(404).json({ message: "Name not found" });
    }
    if (brand) {
      let products = await getProductByBrand(brand);
      return products.length > 0
        ? res.status(200).json(products)
        : res.status(404).json({ message: "Brand not found" });
    }
    if (status) {
      if (typeof status !== "boolean") {
        console.log("este es typeof status 2: ", typeof status);
        return res.status(500).json({ message: "Invalid Input" });
      }
      let products = await getProductsByStatus(product_status);
      return products.length > 0
        ? res.status(200).json(products)
        : res.status(404).json({ message: "Products not found" });
    }
    if (!name && !brand && !category && !status) {
      let products = await getProducts();
      return products.length > 0
        ? res.status(200).json(products)
        : res.status(404).json({ message: "Products not found" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};*/

module.exports = {
  /*getById, getDetailOrdersByProperties,*/
  getDetailOrder,
};