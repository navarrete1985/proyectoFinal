const express = require("express");
var parseurl = require('parseurl')

let login = require("../controllers/LoginController");
let router = express.Router();

router.post("/login", login.login);
router.post("/logout", login.logout);

module.exports = router;