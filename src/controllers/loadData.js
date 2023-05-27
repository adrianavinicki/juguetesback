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

/*
PARA UPDATE DE PRECIOS Y STOCK???
const values = [
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
};
