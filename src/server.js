const express = require("express");
const cors = require("cors");
const exphbs = require("express-handlebars");
const router = require("./routes/routes");

const server = express();
const hbs = exphbs.create();

server.engine('handlebars', hbs.engine);
server.set('view engine', 'handlebars');
server.use(express.static(__dirname + '/views'));
server.set('views', __dirname + '/views');
server.use(express.json());
server.use(cors());
server.use(router);

module.exports = server;
