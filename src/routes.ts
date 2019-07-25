import * as express from 'express';

class Routes {

    constructor(app: express.Application) {
        this.config(app);
    }

    config(app: express.Application) {
        app.use('/', require('./components/index'));
        app.use('/calendar', require('./components/calendar'));
        app.use('/authorize', require('./components/authorize'));
        app.use('/notifications', require('./components/notifications'));
    }
}

export default Routes;