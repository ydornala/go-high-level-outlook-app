import * as express from 'express';
import auth from '../../helpers/auth';
import * as graph from '@microsoft/microsoft-graph-client';
import config from '../../helpers/config';
import * as http from 'http';
import { socket } from '../../app';

const router = express.Router();

router.get('/', async (req, res, next) => {
    let params = { title: 'Calendar', active: { calendar: true }, user: null, debug: null, signInUrl: null, events: null, message: null, error: null };

    const accessToken = await auth.getAccessToken(req.cookies, res);
    const username = req.cookies.graph_username;

    if (accessToken && username) {
        params.user = username;

        const client = graph.Client.init({
            authProvider: (done) => {
                done(null, accessToken);
            }
        });

        try {
            const result = await getCalendarEvents(client);

            params.events = result.value;
            res.render(__dirname + '/view.pug', params);
        } catch (err) {
            params.message = 'Error Retrieving events';
            params.error = { status: `${err.code}: ${err.message}` };

            res.render('error', params);
        }

    } else {
        res.redirect('/');
    }
});

const getCalendarEvents = async (client) => {
    const start = new Date(new Date().setHours(0, 0, 0));
    const end = new Date(new Date(start).setDate(start.getDate() + 7));

    const result = await client
        .api(`/me/calendarView?startDateTime=${start.toISOString()}&endDateTime=${end.toISOString()}`)
        .header('Prefer', 'odata.maxpagesize=99')
        .get();

    return result;
}



exports = module.exports = router;