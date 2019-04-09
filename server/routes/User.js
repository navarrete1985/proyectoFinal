const express = require("express");

let user = require("../controllers/UsersController");
let router = express.Router();

router.get("/", user.getAll);
router.get("/:id", user.find);

router.post("/create", user.create);

router.put("/", user.update);
router.delete("/:id", user.delete);

module.exports = router;