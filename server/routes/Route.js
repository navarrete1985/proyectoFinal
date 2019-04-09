const bodyParser = require('body-parser');
const express = require("express");
const router = express.Router();

class Route {
    constructor(className) {
        express.use(bodyParser.json());
        express.use(bodyParser.urlencoded({ extended: true }));
        this._classType = require(`../controllers/${className}`);
    }

    add(path, method, callback) {
        if (typeof this._classType[callback] === "function" && typeof this.router[method] === "function") {
            this.router[method](callback);
        }
    }

    route() {
        return this.router;
    }

}

module.exports = Route;