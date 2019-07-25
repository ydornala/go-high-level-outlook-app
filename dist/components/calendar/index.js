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
router.get('/', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let params = { title: 'Calendar', active: { calendar: true }, user: null, debug: null, signInUrl: null, events: null, message: null, error: null };
    const accessToken = yield auth_1.default.getAccessToken(req.cookies, res);
    const username = req.cookies.graph_username;
    if (accessToken && username) {
        params.user = username;
        const client = graph.Client.init({
            authProvider: (done) => {
                done(null, accessToken);
            }
        });
        try {
            const result = yield getCalendarEvents(client);
            params.events = result.value;
            res.render(__dirname + '/view.pug', params);
        }
        catch (err) {
            params.message = 'Error Retrieving events';
            params.error = { status: `${err.code}: ${err.message}` };
            res.render('error', params);
        }
    }
    else {
        res.redirect('/');
    }
}));
const getCalendarEvents = (client) => __awaiter(this, void 0, void 0, function* () {
    const start = new Date(new Date().setHours(0, 0, 0));
    const end = new Date(new Date(start).setDate(start.getDate() + 7));
    const result = yield client
        .api(`/me/calendarView/delta?startDateTime=${start.toISOString()}&endDateTime=${end.toISOString()}`)
        .header('Prefer', 'odata.maxpagesize=99')
        .get();
    return result;
});
exports = module.exports = router;
//# sourceMappingURL=index.js.map