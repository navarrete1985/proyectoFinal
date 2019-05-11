const express = require("express");
var parseurl = require('parseurl');
var bcrypt = require('bcrypt');
var jwt = require("jsonwebtoken");

var mdAutenticacion = require("../middlewares/autentication");

let user = require("../controllers/UsersController");
let router = express();

router.get("/", user.getAll);
router.get("/:id", mdAutenticacion.verificaToken, user.find); //mdAutenticacion.verificaToken,
router.post('/pagination', user.getUserPagination);
router.post("/create", user.create);
router.put("/", user.update);
router.delete("/", user.delete);

module.exports = router;