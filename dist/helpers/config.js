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
    },
    subcriptionRequest: {
        changeType: "created,updated",
        notificationUrl: "https://7681ed19.ngrok.io/notifications",
        resource: "me/events",
        expirationDateTime: "2019-07-27T23:10:51.282Z",
        clientState: "goHighLevelSecretClient"
    }
};
//# sourceMappingURL=config.js.map