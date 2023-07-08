require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

/* Prueba de como trabajar la rama work-leo01  */
const { Product } = require("../db");
const {Op} = require('sequelize');
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


// const getAllProducts = async (req,res) => {

//   const pageNumber = req.query.pageNumber || 1;
//   const pageSize = req.query.pageSize || 5;

//   try {
//     const offset = (pageNumber - 1) * pageSize;

//     const datos = await Product.findAll({
//       limit: pageSize,
//       offset: offset,
//     });

//     const totalElements = await Product.count();

//     const totalPages = Math.ceil(totalElements / pageSize);

//     res.status(200).json({
//       data: datos,
//       totalElements: totalElements,
//       totalPages: totalPages,
//       currentPage: pageNumber,
//     })

//   } catch (error) {
//     console.error('Error al obtener los datos paginados:', error);
//     res.status(500).json({ error: 'Error al obtener los datos paginados' });
  
//   }

// }

const getProducts2 = async (req, res) => {
  try {

    let {
      name,
      category,
      brand,
      minimun_age,
      price,
      pageNumber,
      order
    } = req.query;
  
    let offset = 0;
    let limit = 10;
  
    if(pageNumber) {
      pageNumber = parseInt(pageNumber);
      offset = (pageNumber-1) * limit;
    } else {
      pageNumber = 1;
      offset = (pageNumber-1) * limit;
    };
  
    let filters = {};
  
    if(category) filters.category = category;
    if(price) filters.price = {[Op.lte]:price};
    if(brand) filters.brand = brand;
    if(name) filters.name = {[Op.iLike]: `%${name}%`};
    if(minimun_age) filters.minimun_age = {[Op.gte]: minimun_age}
  
    const orderCriteria = order === 'higher' ? [['price', 'DESC']] : [['price', 'ASC']];
    const orderOption = order ? { order: orderCriteria } : {};
  
    const { count, rows } = await Product.findAndCountAll({
      where: filters,
      ...orderOption,
      limit,
      offset,
    });
    
    res.status(200).json({
      data:rows,
      totalElements:count,
      currentPage:pageNumber,
      totalPages: Math.ceil(count/limit)
  
    });
   
  
    
  } catch (error) {
    res.status(500).json({error: error.message});
  }


};


// -----------xxxx-------------------------
// Traigo todos los productos o si hay parametros x producto x categoria/marca/nombre y/o status de mi base de datos

// const getProductsByProperties = async (req, res, next) => {
//   const { name, brand, category, status, minimun_age, price } = req.query;
//   const pageNumber = req.query.pageNumber || 1;
//   const pageSize = req.query.pageSize || 5; 
//   // const { name, brand, category, status, minimun_age, price } = req.body;
//   console.log("este es el query :", req.query);

//   try {
//     if (category && brand && minimun_age && price ) {
//       let products = await getProductByCategoryBrandAgeAndPrice(category, brand, minimun_age, price);
//       return products.length > 0
//         ? res.status(200).json(products)
//         : res.status(404).json({
//             message: "there is no product with the brand and category and age and price required",
//           });
//     }
//     if (category && brand && minimun_age ) {
//       let products = await getProductByCategoryBrandAndAge(category, brand, minimun_age);
//       return products.length > 0
//         ? res.status(200).json(products)
//         : res.status(404).json({
//             message: "there is no product with the brand and category and age required",
//           });
//     }
//     if (category && brand ) {
//         let products = await getProductByCategoryAndBrand(category, brand);
//         return products.length > 0
//           ? res.status(200).json(products)
//           : res.status(404).json({
//               message: "there is no product with the brand and category required",
//             });
//       }

//     if (category && price ) {
//       let products = await getProductByCategoryAndPrice(category, price);
//       return products.length > 0
//         ? res.status(200).json(products)
//         : res.status(404).json({
//             message: "there is no product with the brand and price required",
//           });
//     }

//     if (price && minimun_age ) {
//       let products = await getProductByPriceAndMinimunAge(price, minimun_age);
//       return products.length > 0
//         ? res.status(200).json(products)
//         : res.status(404).json({
//             message: "there is no product with the price and age required",
//           });
//     }

//     if (category && minimun_age ) {
//       let products = await getProductByCategoryAndMinimunAge(category, minimun_age);
//       return products.length > 0
//         ? res.status(200).json(products)
//         : res.status(404).json({
//             message: "there is no product with the brand and category required",
//           });
//     }

//     if (brand && minimun_age ) {
//       let products = await getProductByBrandAndMinimunAge(brand, minimun_age);
//       return products.length > 0
//         ? res.status(200).json(products)
//         : res.status(404).json({
//             message: "there is no product with the brand and age required",
//           });
//     }

//     if (brand && price ) {
//       let products = await getProductByBrandAndPrice(brand, price);
//       return products.length > 0
//         ? res.status(200).json(products)
//         : res.status(404).json({
//             message: "there is no product with the brand and price required",
//           });
//     }

//     if (brand) {
//         let products = await getProductByBrand(brand);
//         return products.length > 0
//           ? res.status(200).json(products)
//           : res.status(404).json({ message: "Brand not found" });
//       }
//     if (category) {
//         // let products = await getProductsByCategory(category);
//         // return products.length > 0
//         //   ? res.status(200).json(products)
//         //   : res.status(404).json({ message: "Category not found" });

//           const offset = (pageNumber - 1) * pageSize;

//           const datos = await Product.findAll({
//             where: {
//               category: {
//                 [Op.iLike]: `%${category}%`, //trae la categoria de forma no case sensitive
//               },
//             },

//             limit: pageSize,
//             offset: offset,
//           });

//           const totalElements = await Product.count();

//           const totalPages = Math.ceil(totalElements / pageSize);

//       return results.length > 0
//         ? res.status(200).json({
//             data: datos,
//             totalElements: totalElements,
//             totalPages: totalPages,
//             currentPage: pageNumber,
//           })
//         : res.status(404).json({ message: "Products not found" });  
//       }
//     if (name) {
//         let products = await getProductByName(name);
//         return products.length > 0
//           ? res.status(200).json(products)
//           : res.status(404).json({ message: "Name not found" });
//       }
//     if (minimun_age) {
//       let products = await getProductByAge(minimun_age);
//       return products.length > 0
//         ? res.status(200).json(products)
//         : res.status(404).json({ message: "Age not found" });
//     }
//     if (price) {
//       let products = await getProductByPrice(price);
//       return products.length > 0
//         ? res.status(200).json(products)
//         : res.status(404).json({ message: "Price not found" });
//     }
//     if (category & status) {
//       if (typeof status !== "boolean") {
//         console.log("este es typeof status: ", typeof status);
//         return res.status(500).json({ message: "Invalid Input" });
//       }
//       let products = await getProductByCategoryAndStatus(
//         category,
//         product_status
//       );
//       return products.length > 0
//         ? res.status(200).json(products)
//         : res.status(404).json({
//             message: "there is no product with the category required",
//           });
//     }
//     if (name & status) {
//       if (typeof status !== "boolean") {
//         console.log("este es typeof status: ", typeof status);
//         return res.status(500).json({ message: "Invalid Input" });
//       }
//       let products = await getProductByNameAndStatus(name, product_status);
//       return products.length > 0
//         ? res.status(200).json(products)
//         : res.status(404).json({
//             message: "there is no product with the name required",
//           });
//     }
//     if (brand & status) {
//       if (typeof status !== "boolean") {
//         console.log("este es typeof status: ", typeof status);
//         return res.status(500).json({ message: "Invalid Input" });
//       }
//       let products = await getProductByBrandAndStatus(brand, product_status);
//       return products.length > 0
//         ? res.status(200).json(products)
//         : res.status(404).json({
//             message: "there is no product with the brand required",
//           });
//     }
//     if (status) {
//       if (typeof status !== "boolean") {
//         console.log("este es typeof status 2: ", typeof status);
//         return res.status(500).json({ message: "Invalid Input" });
//       }
//       let products = await getProductsByStatus(product_status);
//       return products.length > 0
//         ? res.status(200).json(products)
//         : res.status(404).json({ message: "Products not found" });
//     }
//     if (!name && !brand && !category && !status && !minimun_age && !price) {

//           const offset = (pageNumber - 1) * pageSize;

//           const datos = await Product.findAll({
//             limit: pageSize,
//             offset: offset,
//           });

//           const totalElements = await Product.count();

//           const totalPages = Math.ceil(totalElements / pageSize);

//       return results.length > 0
//         ? res.status(200).json({
//             data: datos,
//             totalElements: totalElements,
//             totalPages: totalPages,
//             currentPage: pageNumber,
//           })
//         : res.status(404).json({ message: "Products not found" });
//     }
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };




module.exports = {
  getById,
  // getProductsByProperties,
  // getAllProducts,
  getProducts2,
};
