require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

/* Prueba de como trabajar la rama work-leo01  */
const { Product } = require("../db");
const { Op } = require("sequelize");
const {
  onlyNumbersCheck,
  onlyLettersCheck,
  onlyLettersOrNumbersCheck,
} = require("../helpers/validation.js");
const {
  getProducts,
  getProductByBrandAndStatus,
  getProductByBrand,
  getProductByNameAndStatus,
  getProductByName,
  getProductsByStatus,
  getProductsByCategory,
  getProductByCategoryAndStatus,
  getProductByAge,
  getProductByPrice,
  getProductByCategoryAndBrand,
  getProductByCategoryBrandAgeAndPrice,
  getProductByCategoryBrandAndAge,
  getProductByCategoryAndMinimunAge,
  getProductByCategoryAndPrice,
  getProductByBrandAndMinimunAge,
  getProductByBrandAndPrice,
  getProductByPriceAndMinimunAge,
} = require("../helpers/productshelps.js");

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

const getAllProducts = async (req, res) => {
  const response = await getProducts();

  try {
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProducts2 = async (req, res) => {
  try {
    let {
      name,
      category,
      brand,
      minimun_age,
      price,
      pageNumber,
      order,
      status,
    } = req.query;

    let offset = 0;
    let limit = 10;

    if (pageNumber) {
      pageNumber = parseInt(pageNumber);
      offset = (pageNumber - 1) * limit;
    } else {
      pageNumber = 1;
      offset = (pageNumber - 1) * limit;
    }

    let filters = {};

    if (category&&category!=='All') filters.category = category;
    if (price) filters.price = { [Op.lte]: price };
    if (brand&&brand!=='All') filters.brand = brand;
    if (name) filters.name = { [Op.iLike]: `%${name}%` };
    if (minimun_age&&minimun_age!=='All') filters.minimun_age = { [Op.gte]: minimun_age };
    status
      ? (filters.product_status = status)
      : (filters.product_status = true);

    const orderCriteria =
      order === "higher" ? [["price", "DESC"]] : [["price", "ASC"]];
    const orderOption = order ? { order: orderCriteria } : {};

    const { count, rows } = await Product.findAndCountAll({
      where: filters,
      ...orderOption,
      limit,
      offset,
    });

    res.status(200).json({
      data: rows,
      totalElements: count,
      currentPage: pageNumber,
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getById,
  getAllProducts,
  getProducts2,
};
