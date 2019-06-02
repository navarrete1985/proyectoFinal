const express = require("express");
var mdAutenticacion = require("../middlewares/autentication");

let establishment = require("../controllers/EstablishmentController");
let router = express.Router();

router.get("/", establishment.getAll);
router.get("/:id", establishment.find);
router.post('/pagination', establishment.getStablishmentPagination);

router.post("/", establishment.create);
router.post('/find', mdAutenticacion.verificaToken, establishment.arrayFind);

router.put("/", establishment.update);
router.delete("/:id", establishment.delete);

module.exports = router;