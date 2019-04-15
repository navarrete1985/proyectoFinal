const express = require("express");
var parseurl = require('parseurl')

let login = require("../controllers/LoginController");
let router = express.Router();

router.post("/", login.login);

module.exports = router;