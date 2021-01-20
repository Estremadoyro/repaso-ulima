import * as express from "express";
import * as bodyParser from "body-parser";
import * as session from "express-session"
import { Routes } from "./routes/routes";
import * as path from 'path';

import * as engine from "consolidate"; 

class App {

    public app: express.Application;
    public routePrv: Routes = new Routes();

    constructor() {
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);
    }

    private config(): void {

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.static('public'))
        this.app.set('views', path.join(__dirname, '..', '/views'));
        this.app.set('view engine', 'ejs');
        this.app.use(session({
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: true
        }))
    }
}
export default new App().app;