const { Router } = require("express");
const getProducts = require("./productsRouter");
const getAllUsers = require("./userRouter")

const cors = require("cors");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(cors());
router.use("/products", getProducts);
router.use("/users", getAllUsers);

/*router.get("/", (req, res, next) => {
  return res.status(200).json(getProducts);
});*/

module.exports = router;
