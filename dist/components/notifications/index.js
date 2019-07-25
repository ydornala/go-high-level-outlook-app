"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const auth_1 = require("../../helpers/auth");
const router = express.Router();
const config_1 = require("../../helpers/config");
const app_1 = require("../../app");
router.get('/', function (req, res) {
    let params = { title: 'Home', active: { home: true }, user: null, debug: null, signInUrl: null };
    const accessToken = auth_1.default.getAccessToken(req.cookies, res);
    const username = req.cookies.graph_username;
    if (accessToken && username) {
        params.user = username;
        // params.debug = `User: ${username}\n AccessToken: ${accessToken}`;
    }
    else {
        params.signInUrl = auth_1.default.getAuthUrl();
    }
    res.render(__dirname + '/view.pug', params);
});
router.post('/', (req, res) => {
    console.log('calendar post req ', req.query, req.body);
    let clientStateValid = false;
    let params = { title: 'Calendar', active: { calendar: true }, user: null, debug: null, signInUrl: null, calendar: 'Welcome ---', events: [], message: null, error: null };
    if (req.query && req.query.validationToken) {
        res.send(req.query.validationToken);
    }
    else {
        req.body.value.forEach(subscription => {
            const clientStateExpected = config_1.default.subcriptionRequest.clientState;
            if (subscription.clientState !== clientStateExpected) {
                clientStateValid = false;
            }
            else {
                clientStateValid = true;
            }
        });
        if (clientStateValid) {
            app_1.socket.emit('message', { message: 'Socket IO mesage received...' });
        }
    }
});
exports = module.exports = router;
//# sourceMappingURL=index.js.map