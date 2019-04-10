const express = require("express");

let offer = require("../controllers/OffersController");
let router = express.Router();

router.get("/", offer.getAll);
router.get("/:id", offer.find);

router.post("/", offer.create);

router.put("/", offer.update);
router.delete("/:id", offer.delete);

module.exports = router;