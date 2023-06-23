const { Detailorder, Product, User } = require("../db");
const { Op } = require("sequelize");

const getDetailOrder = async () => {
  return await Detailorder.findAll({
    include: [
      { model: Product, required: id },
      { model: User, required: id },
    ],
  });
};
/*
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
};*/

module.exports = {
  getDetailOrder,
  /*getProductByNameAndStatus,
  getProductByName,
  getProductByBrandAndStatus,
  getProductByBrand,
  getProductsByStatus,
  getProductsByCategory,
  getProductByCategoryAndStatus,*/
};
