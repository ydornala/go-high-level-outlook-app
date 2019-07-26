import * as express from 'express';

import auth from '../../helpers/auth';
import * as graph from '@microsoft/microsoft-graph-client';
const router = express.Router();

import config from '../../helpers/config';
import {socket} from '../../app';
import * as http from 'http';

router.get('/', async function(req, res) {
    let params = {title: 'Home', active: { home: true }, user: null, debug: null, signInUrl: null};

    const accessToken = await auth.getAccessToken(req.cookies, res);
    const username = req.cookies.graph_username;

    if(accessToken && username) {
        params.user = username;

        const client = graph.Client.init({
            authProvider: (done) => {
                done(null, accessToken);
            }
        });

        socket.on('connection', (con) => {
            console.log('Socket IO connected...');
            
            con.join(username.replace(/ /g,''));
            // con.emit('message', {d: 'data'});
        });
    
        try {            
            const events = await client.api('/subscriptions').post(config.subcriptionRequest);

            console.log('Events ==> ', events);
        } catch (error) {
            console.log('Error ==> ', error);
        }

    } else {
        params.signInUrl = auth.getAuthUrl();
    }

    res.render(__dirname + '/view.pug', params);
});

exports = module.exports = router;