const { Router } = require("express");
/* const {getAllUsers } = require("../controllers/getAllUsers"); */
const { createUser } = require("../controllers/PostUsers.js");

const router = Router();

/* router.get("/", getAllUsers); */
router.post("/create", createUser);

module.exports = router;
