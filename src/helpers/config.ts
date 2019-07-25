export default {
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
        notificationUrl: "https://go-high-level-app.herokuapp.com/notifications",
        resource: "me/events",
        expirationDateTime: "2019-07-27T23:10:51.282Z",
        clientState: "goHighLevelSecretClient"
    }
}