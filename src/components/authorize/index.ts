import * as express from 'express';
const router = express.Router();

import auth from '../../helpers/auth';

/* GET /authorize. */
router.get('/', async function(req, res, next) {
    // Get auth code
    const code = req.query.code;
    console.log('code', code);
    // If code is present, use it
    if (code) {
        let token;

        try {
            await auth.getTokenFromCode(code, res);
            res.redirect('/');
        } catch (error) {
            res.render('error', { title: 'Error', message: 'Error exchanging code for token', error: error });
        }
    } else {
    // Otherwise complain
    res.render('error', { title: 'Error', message: 'Authorization error', error: { status: 'Missing code parameter' } });
    }
});

router.get('/signout', function(req, res, next) {
    auth.clearCookies(res);
    // Redirect to home
    res.redirect('/');
});

module.exports = router;