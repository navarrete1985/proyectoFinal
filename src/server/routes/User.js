const express = require("express");
var parseurl = require('parseurl');
var bcrypt = require('bcrypt');
var jwt = require("jsonwebtoken");

var mdAutenticacion = require("../middlewares/autentication");

let user = require("../controllers/UsersController");
let router = express();

router.get("/", user.getAll);
router.get("/:id",  mdAutenticacion.verificaToken,user.find);
router.post("/create", user.create);
router.put("/", user.update);
router.delete("/:id", user.delete);

module.exports = router;