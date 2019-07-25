"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const auth_1 = require("../../helpers/auth");
const graph = require("@microsoft/microsoft-graph-client");
const router = express.Router();
const config_1 = require("../../helpers/config");
const app_1 = require("../../app");
const http = require("http");
router.get('/', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let params = { title: 'Home', active: { home: true }, user: null, debug: null, signInUrl: null };
        const accessToken = yield auth_1.default.getAccessToken(req.cookies, res);
        const username = req.cookies.graph_username;
        if (accessToken && username) {
            params.user = username;
            const client = graph.Client.init({
                authProvider: (done) => {
                    done(null, accessToken);
                }
            });
            app_1.socket.on('connection', (con) => {
                console.log('Socket IO connected...');
                con.on('message', (data) => __awaiter(this, void 0, void 0, function* () {
                    console.log('DATA', data);
                    http.get('http://localhost:3001/calendar', r => { });
                }));
                con.emit('message', { d: 'data' });
            });
            try {
                const events = yield client.api('/subscriptions').post(config_1.default.subcriptionRequest);
                console.log('Events ==> ', events);
            }
            catch (error) {
                console.log('Error ==> ', error);
            }
        }
        else {
            params.signInUrl = auth_1.default.getAuthUrl();
        }
        res.render(__dirname + '/view.pug', params);
    });
});
exports = module.exports = router;
//# sourceMappingURL=index.js.map