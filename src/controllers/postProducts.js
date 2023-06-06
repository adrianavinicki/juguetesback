require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const cloudinary = require("cloudinary").v2;
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

const { Product } = require("../db");
const { onlyNumbersCheck } = require("../helpfuls/validation.js");

//crear un producto

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const postNewProduct = async (req, res, next) => {
  const {
    id_product,
    name,
    brand,
    category,
    minimun_age,
    description,
    quantity,
    price,
    product_status,
  } = req.body;

  try {
    const showImage = await cloudinary.uploader.upload(req.body.image, {
      public_id: name, // Asignar el nombre del producto como public_id
    });
    image = showImage.secure_url; // Guardar la URL de la imagen en un nuevo array*/

    const productCreated = await Product.findOrCreate({
      where: { id_product },
      defaults: {
        id_product,
        name,
        brand,
        category,
        minimun_age,
        description,
        quantity,
        price,
        image,
        product_status,
      },
    });
    !productCreated
      ? res.status(400).json({ message: "Product already exists" })
      : res.status(200).json({ message: "Product created" });
  } catch (error) {
    next(error);
  }
};

module.exports = { postNewProduct };
