const { Router } = require("express");
const { userFavs, getAllFavs } = require("../controllers/setFavorites");

const router = Router();

router.put("/userFavs/:id", userFavs).get("/getFav/:id", getAllFavs); // NO DEBERIA TENER COMO NOMBRE INICIAL ROUTER SINO FAVORITOS

module.exports = router; //OJO CON ESTO TAMBIEN
