require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const { Product } = require("../db");
const { onlyNumbersCheck } = require("../helpfuls/validation.js");

// Traigo info de productos de mi base de datos

const getProductsDb = async (req, res) => {
  try {
    const productsDb = await Product.findAll();
    console.log("esta es la db: ", productsDb);
    let dbProductsTotal = productsDb.map((p) => {
      return {
        id: p.id_product,
        name: p.name,
        brand: p.brand,
        category: p.brand,
        minimun_age: p.minimum_age,
        description: p.description,
        quantity: p.quantity,
        price: p.price,
        image: p.image,
        status: p.product_status,
        createdInDb: p.createdInDb,
      };
    });
    console.log("esta es total: ", dbProductsTotal);
    res.status(200).json(dbProductsTotal);
  } catch (e) {
    res.status(404).json(e.message);
  }
};

// -----------xxxx-------------------------
// Traigo producto x id de mi base de datos

const getById = async (req, res, next) => {
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
};

module.exports = { getProductsDb, getById };
