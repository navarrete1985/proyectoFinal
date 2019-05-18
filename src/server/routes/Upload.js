const express = require("express");

let uploadStorage = require('../util/UploadStorage');
let upload = require("../controllers/UploadController");
let router = express.Router();

router.post("/upload", uploadStorage.array('files[]', 20), upload.upload);

module.exports = router;