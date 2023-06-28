const { Router } = require("express");

const cors = require("cors");
const router = Router();
const getProducts = require("./productsRouter");
const userRouter = require("./userRouter");
const RatingRouter = require("./ratingRouter.js");
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(cors());
router.use("/products", getProducts);
router.use("/users", userRouter);
router.use("/ratings", RatingRouter);

/*router.get("/", (req, res, next) => {
  return res.status(200).json(getProducts);
});*/

module.exports = router;
