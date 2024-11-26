import express from 'express';
import cookieSession from 'cookie-session';
import { engine } from "express-handlebars";
import router from "./routes";
import initWebSocket from './websocket';
import { config } from '../config';

initWebSocket(config.ws_port);

const app = express();
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
}));
app.use(express.urlencoded({ extended: false }));

app.set('views', 'app/views');
app.engine("handlebars", engine());
app.set("view engine", "handlebars");

app.use(router());
app.use(express.static("static"));
app.use(express.static("dist"));

app.listen(config.port, () =>
    console.log(`Server is listening to http://localhost:${config.port}`),
);