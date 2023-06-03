require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const { Product } = require("../db");
const {
  onlyNumbersCheck,
  onlyLettersCheck,
  onlyLettersOrNumbersCheck,
} = require("../helpfuls/validation.js");
const {
  getProducts,
  getProductByBrandAndStatus,
  getProductByBrand,
  getProductByNameAndStatus,
  getProductByName,
  getProductsByStatus,
  getProductsByCategory,
  getProductByCategoryAndStatus,
} = require("../helpfuls/productshelps.js");

// Traigo info de productos de mi base de datos

/*const getProductsDb = async (req, res) => {
  try {
    const productsDb = await Product.findAll();
    console.log("esta es total: ", productsDb);
    res.status(200).json(productsDb);
  } catch (e) {
    res.status(404).json(e.message);
  }
};*/

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

// -----------xxxx-------------------------
// Traigo producto x categoria/marca/nombre y/o status de mi base de datos

const getProductsByProperties = async (req, res, next) => {
  const { name, brand, category, status } = req.query;

  console.log("este es el query :", req.query);
  //let categoryCheck = onlyLettersOrNumbersCheck(category);

  try {
    if (category & status) {
      /*if (categoryCheck !== true) {
        return res.status(500).json({ message: "Invalid Input 1" });
      }*/
      if (typeof status !== "boolean") {
        console.log("este es typeof status: ", typeof status);
        return res.status(500).json({ message: "Invalid Input 2" });
      }
      let products = await getProductByCategoryAndStatus(
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
      /*if (categoryCheck !== true) {
        return res.status(500).json({ message: "Invalid Input 1" });
      }*/
      if (typeof status !== "boolean") {
        console.log("este es typeof status: ", typeof status);
        return res.status(500).json({ message: "Invalid Input 2" });
      }
      let products = await getProductByNameAndStatus(name, product_status);
      return products.length > 0
        ? res.status(200).json(products)
        : res.status(404).json({
            message: "there is no product with the name required",
          });
    }
    if (brand & status) {
      /*if (categoryCheck !== true) {
        return res.status(500).json({ message: "Invalid Input 1" });
      }*/
      if (typeof status !== "boolean") {
        console.log("este es typeof status: ", typeof status);
        return res.status(500).json({ message: "Invalid Input 2" });
      }
      let products = await getProductByBrandAndStatus(brand, product_status);
      return products.length > 0
        ? res.status(200).json(products)
        : res.status(404).json({
            message: "there is no product with the category required",
          });
    }
    if (category) {
      /*if (categoryCheck !== true)
        return res.status(500).json({ message: "Invalid Input 3" });*/

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
        return res.status(500).json({ message: "Invalid Input 4" });
      }
      let products = await getProductsByStatus(product_status);
      return products.length > 0
        ? res.status(200).json(products)
        : res.status(404).json({ message: "Product not found" });
    }

    if (!name && !brand && !category && !status) {
      let products = await getProducts();
      return products.length > 0
        ? res.status(200).json(products)
        : res.status(404).json({ message: "Products not found" });
    }
  } catch (error) {
    res.status(404).json({ message: "error final" /*error.message*/ });
  }
};

module.exports = { /*getProductsDb,*/ getById, getProductsByProperties };
/*const getMoviesByParameter = async (req, res, next) => {
  const { name, active } = req.query;

  let checkName = onlyLettersOrNumbersCheck(name);
  let checkActive = name;

  try {
    if (name && active) {
      if (checkName !== true)
        return res.status(500).json({ message: "Invalid Input" });

      if (typeof active !== "boolean")
        return res.status(500).json({ message: "Invalid Input" });
      let movie = await getMoviesByNameAndActive(name, active);
      return movie.length > 0
        ? res.status(200).json(movie)
        : res
            .status(404)
            .json({ message: "No movie found with the specified criteria" });
    }

    if (name) {
      if (checkName !== true)
        return res.status(500).json({ message: "Invalid Input" });

      let movie = await getMoviesByName(name);
      return movie.length > 0
        ? res.status(200).json(movie)
        : res.status(404).json({ message: "No movie found with that name" });
    }

    if (active) {
      if (typeof active !== "boolean")
        return res.status(500).json({ message: "Invalid Input" });
      let movie = await getMoviesByActive(active);
      return movie.length > 0
        ? res.status(200).json(movie)
        : res
            .status(404)
            .json({ message: "No movie found with the specified criteria" });
    }

    if (!name && !active) {
      let movies = await getMovies();
      return movies.length > 0
        ? res.status(200).json(movies)
        : res.status(404).json({ message: "No movies found" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};*/
