const express = require("express");

let establishment = require("../controllers/EstablishmentController");
let router = express.Router();

router.get("/", establishment.getAll);
router.get("/:uuid", establishment.find);

router.post("/", establishment.create);

router.put("/", establishment.update);
router.delete("/:uuid", establishment.delete);

module.exports = router;