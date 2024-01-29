const express = require("express");
const cors = require("cors");
// const multer = require("multer");
const exphbs = require("express-handlebars");

// const multer = multer({dest: './images/emblems'});

const server = express();
const hbs = exphbs.create();

server.engine('handlebars', hbs.engine);
server.set('view engine', 'handlebars');
server.use(express.json());
server.use(cors());


module.exports = server;
