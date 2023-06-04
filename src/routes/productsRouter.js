const { Router } = require("express");
const {
  getById,
  getProductsByProperties,
} = require("../controllers/getAllProducts.js");
const { postNewProduct } = require("../controllers/postProducts.js");

const router = Router();

router.get("/:id", getById);
router.get("/", getProductsByProperties);
router.post("/create", postNewProduct);

module.exports = router;

/*const { Router } = require("express");
const {
  getAllHotels,
  postNewHotel,
  getHotelById,
  deleteHotel,
  DisableHotel,
  ModifyHotel,
} = require("../controllers/hotelsControllers.js");

const router = Router();

router.get("/", getAllHotels);
// router.get("/", getSearchHotels); se comenta para que no haga crash
router.post("/create", postNewHotel);
router.get("/:id", getHotelById);
router.delete("/delete/:idHotels", deleteHotel);
router.put("/disable/:idHotels", DisableHotel);
router.put("/modify/:idHotels", ModifyHotel);

module.exports = router;*/
