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
const router = express.Router();
const auth_1 = require("../../helpers/auth");
/* GET /authorize. */
router.get('/', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // Get auth code
        const code = req.query.code;
        console.log('code', code);
        // If code is present, use it
        if (code) {
            let token;
            try {
                yield auth_1.default.getTokenFromCode(code, res);
                res.redirect('/');
            }
            catch (error) {
                res.render('error', { title: 'Error', message: 'Error exchanging code for token', error: error });
            }
        }
        else {
            // Otherwise complain
            res.render('error', { title: 'Error', message: 'Authorization error', error: { status: 'Missing code parameter' } });
        }
    });
});
router.get('/signout', function (req, res, next) {
    auth_1.default.clearCookies(res);
    // Redirect to home
    res.redirect('/');
});
module.exports = router;
//# sourceMappingURL=index.js.map