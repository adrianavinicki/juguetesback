const { Router } = require("express");
const delProduct = require("../controllers/delProduct");
const {
  getById,
  getProductsByProperties,
  getAllProducts,
  getProducts2,
} = require("../controllers/getAllProducts.js");
const { postNewProduct } = require("../controllers/postProducts.js");
const {
  putProduct,
  newStatusProduct,
} = require("../controllers/putProducts.js");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storageCloud = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "/",
  allowed_formats: ["jpeg", "png", "jpg"],
});

const upload = multer({ storage: storageCloud });

const router = Router();

router.get("/:id", getById);
router.get("/", getProducts2);
router.get("/all/products", getAllProducts);
router.post("/create", upload.single("image"), postNewProduct);
router.put("/update/:id", putProduct);
router.put("/statusupdate/:id", newStatusProduct);
router.delete("/delete/:id", delProduct.deleteProduct);

module.exports = router;
