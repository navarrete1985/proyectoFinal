const express = require("express");

let menu = require("../controllers/MenuController");
let router = express.Router();

router.get("/", menu.getAll);
router.get("/:id", menu.find);

router.post("/", menu.create);

router.put("/", menu.update);
router.delete("/:id", menu.delete);

module.exports = router;