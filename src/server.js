const express = require("express");
const cors = require("cors");
// const multer = require("multer");
const exphbs = require("express-handlebars");
const router = require("./routes/routes");

// const multer = multer({dest: './images/emblems'});

const server = express();
const hbs = exphbs.create();

server.engine('handlebars', hbs.engine);
server.set('view engine', 'handlebars');
server.use('views', __dirname + '/views');
server.use(express.json());
server.use(cors());
server.use(router);

module.exports = server;
