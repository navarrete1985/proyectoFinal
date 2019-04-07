class Route {

    constructor(className) {
        const express = require("express");
        const router = express.Router();
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