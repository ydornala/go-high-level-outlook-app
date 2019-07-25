"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
router.get('/', (req, res, next) => {
    console.log('ene');
    res.render(__dirname + '/view.pug', { calendar: 'Welcome to Outlook' });
});
exports = module.exports = router;
//# sourceMappingURL=index.js.map