"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    credentials: {
        client: {
            id: process.env.APP_ID,
            secret: process.env.APP_PASSWORD,
        },
        auth: {
            tokenHost: 'https://login.microsoftonline.com',
            authorizePath: 'common/oauth2/v2.0/authorize',
            tokenPath: 'common/oauth2/v2.0/token'
        }
    }
};
//# sourceMappingURL=config.js.map