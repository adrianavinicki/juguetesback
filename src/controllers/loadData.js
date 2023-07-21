const { Product } = require("../db");

const listProducts = require("../data/productsDb.js");

//!-------------

const loadProductsInDB = async (req, res, next) => {
  const fillProductDb = await Product.bulkCreate(listProducts.map((p) => p));
  if (!fillProductDb) {
    throw new Error("Error loading the products ");
  } else {
    {
      console.log("Products successfully loaded");
    }
  }
};

module.exports = {
  loadProductsInDB,
};
