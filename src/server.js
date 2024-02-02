import express, { static as expressStatic, json } from "express";
import cors from "cors";
import { create } from "express-handlebars";
import router from "./routes/routes.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
const hbs = create();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(expressStatic(__dirname + '/views'));
app.set('views', __dirname + '/views');
app.use(json());
app.use(cors());
app.use(router);


export default app;