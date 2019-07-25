import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as http from 'http';
import * as io from 'socket.io';


import Routes from './routes';
import serveStatic = require('serve-static');
require('dotenv').config();

class Server {
    public app: express.Application;
    public socketServer;

    constructor() {
        this.app = express();

        this.config();
    }

    public config() {
        this.app.use(express.static(path.join(__dirname, 'public')));
        
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'pug');
        this.app.locals.basedir = path.join(__dirname, 'views');

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));

        this.app.use(cookieParser());

        // Load Routes
        const routes = new Routes(this.app);

        // this.socketServer = this.registerSocketio(this.app);
    }

    public registerSocketio(app) {
        const socketServer = http.createServer(app);
        // socketServer.listen('3001');
        return io(socketServer);
    }
}

export default new Server().app;
export const socketServer = new Server().socketServer;