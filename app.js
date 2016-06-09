'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(bodyParser.json());

app.use("/img", express.static(__dirname + '/views/img'));
app.use("/css", express.static(__dirname + '/views/css'));
app.use("/js", express.static(__dirname + '/views/js'));
// app.use("/client", express.static(__dirname + '/views/client/chatraum'));
// app.use("/bilder", express.static(__dirname + '/views/client/chatraum/img'));
// app.use("/styles", express.static(__dirname + '/views/client/chatraum/css'));
// app.use("/scripte", express.static(__dirname + '/views/client/chatraum/js'));

app.get('/', function(req, res) {
    res.render('index', {
        appToken: process.env.SMOOCH_APP_TOKEN
    });
});

module.exports = app;
