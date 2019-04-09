const express = require("express");

let allergen = require("../controllers/AllergensController");
let router = express.Router();

router.get("/", allergen.getAll);
router.get("/:id", allergen.find);

router.post("/", allergen.create);

router.put("/", allergen.update);
router.delete("/:id", allergen.delete);

module.exports = router;