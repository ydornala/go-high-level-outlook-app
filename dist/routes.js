"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Routes {
    constructor(app) {
        this.config(app);
    }
    config(app) {
        app.use('/', require('./components/index'));
        app.use('/calendar', require('./components/calendar'));
        app.use('/authorize', require('./components/authorize'));
    }
}
exports.default = Routes;
//# sourceMappingURL=routes.js.map