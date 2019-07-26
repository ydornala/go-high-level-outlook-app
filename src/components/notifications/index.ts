import * as express from 'express';

import auth from '../../helpers/auth';

const router = express.Router();

import config from '../../helpers/config';
import { socket } from '../../app';
import * as http from 'http';

router.get('/', function(req, res) {
    let params = {title: 'Home', active: { home: true }, user: null, debug: null, signInUrl: null};

    const accessToken = auth.getAccessToken(req.cookies, res);
    const username = req.cookies.graph_username;

    if(accessToken && username) {
        params.user = username;
        // params.debug = `User: ${username}\n AccessToken: ${accessToken}`;
    } else {
        params.signInUrl = auth.getAuthUrl();
    }

    res.render(__dirname + '/view.pug', params);
});

router.post('/', (req, res) => {
    console.log('calendar post req ', req.query, req.body);

    let clientStateValid= false;    
    let params = {title: 'Calendar', active: { calendar: true }, user: null, debug: null, signInUrl: null, calendar: 'Welcome ---', events: [], message: null, error: null};

    if(req.query && req.query.validationToken) {
        res.send(req.query.validationToken);
    } else {
            req.body.value.forEach(subscription => {
                const clientStateExpected = config.subcriptionRequest.clientState;

                if(subscription.clientState !== clientStateExpected) {
                    clientStateValid = false;
                } else {
                    clientStateValid = true;
                }
            });

            if(clientStateValid) {
                const username = auth.getUsername();
                                
                if(username) {
                    socket.to(username.replace(/ /g,'')).emit('message', {message: 'Socket IO mesage received...'});
                }
            }
    }
});

exports = module.exports = router;