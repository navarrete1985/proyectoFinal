const express = require("express");

let waiter = require("../controllers/WaitersController");
let router = express.Router();

router.get("/", waiter.getAll);
router.get("/:id", waiter.find);

router.post("/", waiter.create);

router.put("/", waiter.update);
router.delete("/:id", waiter.delete);

module.exports = router;