const { Router } = require("express");

const cors = require("cors");
const router = Router();
const getProducts = require("./productsRouter");
const userRouter = require("./userRouter");
const detailOrdersRouter = require("./detailOrderRouter");
const orderRouter = require("./OrderRouter");
const FavoriteRouter = require("./favoriteRouter");
const ratingRouter = require("./ratingRouter");
const paymentRouter = require("./paymentRouter");
//const sendWelcome= require("./SendWelcome");
//const sendCompra= require("./SendCompra");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(cors());
router.use("/products", getProducts);
router.use("/users", userRouter);
router.use("/detailorders", detailOrdersRouter);
router.use("/orders", orderRouter);
router.use("/favorites", FavoriteRouter); // LA BASE QUE SE CREA ES FAVORITOS
router.use("/rating", ratingRouter);
router.use("/payments", paymentRouter);
//router.use("/sendWelcome", sendWelcome);
//router.use("/sendCompra", sendCompra);
/*router.get("/", (req, res, next) => {
  return res.status(200).json(getProducts);
});*/

module.exports = router;
