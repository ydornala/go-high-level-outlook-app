"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const auth_1 = require("../../helpers/auth");
const router = express.Router();
router.get('/', function (req, res) {
    let params = { title: 'Home', active: { home: true }, user: null, debug: null, signInUrl: null };
    // console.log('auth', auth.getAuthUrl());
    const accessToken = auth_1.default.getAccessToken(req.cookies, res);
    const username = req.cookies.graph_username;
    if (accessToken && username) {
        params.user = username;
        params.debug = `User: ${username}\n AccessToken: ${accessToken}`;
    }
    else {
        params.signInUrl = auth_1.default.getAuthUrl();
        params.debug = params.signInUrl;
    }
    res.render(__dirname + '/view.pug', params);
});
exports = module.exports = router;
//# sourceMappingURL=index.js.map