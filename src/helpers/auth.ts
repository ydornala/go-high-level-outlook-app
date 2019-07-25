import config from './config';
import * as jwt from 'jsonwebtoken';
import * as simpleOauth2 from 'simple-oauth2';

class auth {
    public oauth2;

    constructor() {
        this.oauth2 = require('simple-oauth2').create(config.credentials);
    }

    getAuthUrl() {
        const returnUrl = this.oauth2.authorizationCode.authorizeURL({
            redirect_uri: process.env.REDIRECT_URI,
            scope: process.env.APP_SCOPES
        });

        console.log('Auth URL', returnUrl);

        return returnUrl;
    }

    public async getAccessToken(cookies, res) {
        // Do we have an access token cached?
        let token = cookies.graph_access_token;

        if (token) {
            // We have a token, but is it expired?
            // Expire 5 minutes early to account for clock differences
            const FIVE_MINUTES = 300000;
            const expiration = new Date(cookies.graph_token_expires - FIVE_MINUTES);
            if (expiration > new Date()) {
                // Token is still good, just return it
                return token;
            }
        }

        // Either no token or it's expired, do we have a
        // refresh token?
        const refresh_token = cookies.graph_refresh_token;
        if (refresh_token) {
            const newToken = await this.oauth2.accessToken.create({ refresh_token: refresh_token }).refresh();
            this.saveValuesToCookie(newToken, res);
            return newToken.token.access_token;
        }

        // Nothing in the cookies that helps, return empty
        return null;
    }

    async getTokenFromCode(auth_code, res) {
        let result = await this.oauth2.authorizationCode.getToken({
            code: auth_code,
            redirect_uri: process.env.REDIRECT_URI,
            scope: process.env.APP_SCOPES
        });

        console.log('reseul', result);

        const token = this.oauth2.accessToken.create(result);
        
        console.log('Token Created: ', token.token);

        this.saveValuesToCookie(token, res);

        return token.token.accessToken;
    }

    saveValuesToCookie(token, res) {
        const user = jwt.decode(token.token.id_token);

        res.cookie('graph_access_token', token.token.access_token, { maxAge: 3600000, httpOnly: true });
        res.cookie('graph_username', user.name, { maxAge: 3600000, httpOnly: true });
        // Save the refresh token in a cookie
        res.cookie('graph_refresh_token', token.token.refresh_token, { maxAge: 7200000, httpOnly: true });
        // Save the token expiration time in a cookie
        res.cookie('graph_token_expires', token.token.expires_at.getTime(), { maxAge: 3600000, httpOnly: true });
    }

    public clearCookies(res) {
        res.clearCookie('graph_access_token', {maxAge: 3600000, httpOnly: true});
        res.clearCookie('graph_user_name', {maxAge: 3600000, httpOnly: true});
        res.clearCookie('graph_refresh_token', {maxAge: 7200000, httpOnly: true});
        res.clearCookie('graph_token_expires', {maxAge: 3600000, httpOnly: true});
    }
}

export default new auth();