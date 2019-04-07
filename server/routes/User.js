const express = require("express");
const router = express.Router();

let user = require("../controllers/UsersController");

router.get("/getAll", user.getAll);
router.post("/create", user.create);

module.exports = router;