"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const routes_1 = require("./routes");
require('dotenv').config();
class Server {
    constructor() {
        this.app = express();
        this.config();
    }
    config() {
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'pug');
        this.app.locals.basedir = path.join(__dirname, 'views');
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        // Load Routes
        const routes = new routes_1.default(this.app);
    }
}
exports.default = new Server().app;
//# sourceMappingURL=server.js.map