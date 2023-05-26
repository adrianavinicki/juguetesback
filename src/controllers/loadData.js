const { Product, Stock, Price } = require("../db");

const listProducts = require("../data/productsDb.js");
const listStocks = require("../data/stocksDb.js");
const listPrices = require("../data/priceProdDb.js");

//!-------------

const loadStocksInDB = async (req, res, next) => {
  const fillStockDb = await Stock.bulkCreate(listStocks.map((q) => q));
  /* let productDb = await Product.findAll({
    where: { id_product: 1 },
  });
  await fillStockDb.addProduct(productDb);*/
  if (!fillStockDb) {
    throw new Error("Error loading the products ");
  } else {
    {
      console.log("Stocks successfully loaded");
    }
  }
};

const loadPricesInDB = async (req, res, next) => {
  const fillPricesDb = await Price.bulkCreate(listPrices.map((p) => p));
  if (!fillPricesDb) {
    throw new Error("Error loading the products ");
  } else {
    {
      console.log("Stocks successfully loaded");
    }
  }
};

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

/*const values = [
  { id: 2, firstName: "Daniel" },
  { id: 3, firstName: "Jackson" },
];*/

/*const statements = [];
const tableName = "Products";

for (let i = 1; i < listProducts.length; i++) {
  statements.push(
    sequelize.query(
      `UPDATE ${tableName} 
      SET firstName='${values[i].firstName}' 
      WHERE id=${values[i].id};`
    )
  );
}
const result = await Promise.all(statements);
console.log(result); */

module.exports = {
  loadProductsInDB,
  loadStocksInDB,
  loadPricesInDB,
};

/*const values = [
  { id: 2, firstName: "Daniel" },
  { id: 3, firstName: "Jackson" },
];

const statements = [];
const tableName = "Users";

for (let i = 0; i < values.length; i++) {
  statements.push(
    sequelize.query(
      `UPDATE ${tableName} 
      SET firstName='${values[i].firstName}' 
      WHERE id=${values[i].id};`
    )
  );
}
const result = await Promise.all(statements);
console.log(result); */
