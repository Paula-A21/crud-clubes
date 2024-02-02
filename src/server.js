import express, { static as expressStatic, json } from "express";
import cors from "cors";
import { create } from "express-handlebars";
import router from "./routes/routes.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = express();
const hbs = create();

server.engine('handlebars', hbs.engine);
server.set('view engine', 'handlebars');
server.use(expressStatic(__dirname + '/views'));
server.set('views', __dirname + '/views');
server.use(json());
server.use(cors());
server.use(router);

export default server;
