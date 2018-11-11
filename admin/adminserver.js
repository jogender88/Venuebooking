var express = require('express');
var bodyParser = require('body-parser');
var cookiesParser = require('cookie-parser');
var routes = require('./routes/index.js');
var urlencoderParser = bodyParser.urlencoded({
    extended: false
});

var expressSession = require('express-session');
var app = express();
var port = process.env.port || 4343;
var monogojs = require('mongojs');
var nodeMailer = require('nodemailer');
var db = monogojs('roombooking', ['admin']);
var ObjectID = require('mongodb').ObjectID;


var bookl = monogojs('roombooking', ['bookingapplications']);
app.use('/static', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(cookiesParser());
app.use(expressSession({
    secret: "MySessionKey",
    resave: true,
    saveUninitialized: true
}));
routes(app);
//

//
app.listen(port);