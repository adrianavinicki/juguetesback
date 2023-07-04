const { Router } = require("express");
const { userFavs, getAllFavs } = require("../controllers/setFavorites");

const router = Router();

router.put("/userFavs/:id", userFavs).get("/getFav/:id", getAllFavs);

module.exports = router;

