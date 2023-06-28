const { Router } = require("express");

const cors = require("cors");
const router = Router();
const getProducts = require("./productsRouter");
const userRouter = require("./userRouter");
<<<<<<< HEAD
const RatingRouter = require("./ratingRouter.js");
=======
const detailOrdersRouter = require("./detailOrderRouter");
const orderRouter = require('./OrderRouter')
>>>>>>> 469e4c227f13761e78b7f4a2b816ac2256480e0d
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(cors());
router.use("/products", getProducts);
router.use("/users", userRouter);
<<<<<<< HEAD
router.use("/ratings", RatingRouter);

=======
router.use("/detailorders", detailOrdersRouter);
router.use('/orders', orderRouter);
>>>>>>> 469e4c227f13761e78b7f4a2b816ac2256480e0d
/*router.get("/", (req, res, next) => {
  return res.status(200).json(getProducts);
});*/

module.exports = router;
