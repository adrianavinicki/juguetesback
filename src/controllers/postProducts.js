require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const cloudinary = require("cloudinary").v2;
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

const { Product } = require("../db");
//const { onlyNumbersCheck } = require("../helpfuls/validation.js");

//crear un producto

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const postNewProduct = async (req, res, next) => {

  let {
    name,
    brand,
    category,
    minimun_age,
    description,
    quantity,
    price,
   // image,
    product_status,
  } = req.body;
  
  console.log("este es el body: ", req.body);
  try {
    const showImage = await cloudinary.uploader.upload(req.file.path, {
      public_id: name, // Asignar el nombre del producto como public_id
    });
    image = showImage.secure_url; // Guardar la URL de la imagen en un nuevo array
    const productCreated = await Product.findOrCreate({
      where: { name },
      defaults: {
        name,
        brand,
        category,
        minimun_age,
        description,
        quantity: parseInt(quantity),
        price: parseFloat(price),
        image,
        product_status,
      },
    });
    //console.log("Producto creado correctamente:", productCreated.toJSON());
    !productCreated
      ? res.status(400).json({ message: "Product already exists" })
      : res.status(201).json({ message: "Product created" });
  } catch (error) {
    
    next(error);
  }
};

module.exports = { postNewProduct };
