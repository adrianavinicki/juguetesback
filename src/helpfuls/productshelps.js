const { Product } = require("../db");
const { Op } = require("sequelize");

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

const getProductByName = async (name) => {
  return await Product.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
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

module.exports = {
  getProductByNameAndStatus,
  getProductByName,
  getProductsByStatus,
};
