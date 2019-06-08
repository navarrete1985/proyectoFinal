const express = require("express");

let tables = require("../controllers/TablesController");
let router = express.Router();

router.get("/", tables.getAll);
router.get("/:uuid", tables.find);

router.post("/", tables.create);
router.post("/change", tables.change_state);

router.put("/", tables.update);
router.delete("/:uuid", tables.delete);

module.exports = router;