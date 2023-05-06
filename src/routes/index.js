const { Router } = require("express");
//const getAllProducts = require("./hotelsRouter"); //Verlo

const cors = require("cors");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(cors());
//router.use("/product", getAllProducts);

// router.get("/", (req, res, next) => {
//   return res.status(200).json(hoteles);
// });
/*router.get("/", (req, res, next) => {
  return res.status(200).json(getAllProducts);
});*/

module.exports = router;
