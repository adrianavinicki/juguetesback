const { Router } = require("express");


const cors = require("cors");
const router = Router();
const getProducts = require("./productsRouter");
const UserRouter = require("./userRouter");
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(cors());
router.use("/products", getProducts);
router.use("/users", UserRouter);

/*router.get("/", (req, res, next) => {
  return res.status(200).json(getProducts);
});*/

module.exports = router;
