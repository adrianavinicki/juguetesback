const { Product } = require("../db");
const { Op } = require("sequelize");

const getProducts = async () => {
  return await Product.findAll();
};

const getProductByNameAndStatus = async (name, status) => {
  return await Product.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
      product_status: status,
    },
  });
};

const getProductByBrandAndStatus = async (brand, status) => {
  return await Product.findAll({
    where: {
      brand: {
        [Op.iLike]: `%${brand}%`,
      },
      product_status: status,
    },
  });
};

const getProductByCategoryAndStatus = async (category, status) => {
  return await Product.findAll({
    where: {
      category: {
        [Op.iLike]: `%${category}%`,
      },
      product_status: status,
    },
  });
};

const getProductByName = async (name) => {
  return await Product.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
  });
};

const getProductByBrand = async (brand) => {
  return await Product.findAll({
    where: {
      brand: {
        [Op.iLike]: `%${brand}%`,
      },
    },
  });
};

const getProductsByStatus = async (status) => {
  return await Product.findAll({
    where: {
      product_status: status,
    },
  });
};

const getProductsByCategory = async (category) => {
  return await Product.findAll({
    where: {
      category: {
        [Op.iLike]: `%${category}%`, //trae la categoria de forma no case sensitive
      },
    },
  });
};

module.exports = {
  getProducts,
  getProductByNameAndStatus,
  getProductByName,
  getProductByBrandAndStatus,
  getProductByBrand,
  getProductsByStatus,
  getProductsByCategory,
  getProductByCategoryAndStatus,
};
