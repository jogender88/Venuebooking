'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var cookiesParser = require('cookie-parser');
var urlencoderParser = bodyParser.urlencoded({
    extended: false
});
var expressSession = require('express-session');
var app = express();
var monogojs = require('mongojs');
var nodeMailer = require('nodemailer');
var db = monogojs('roombooking', ['admin']);
var ObjectID = require('mongodb').ObjectID;

var validator = require("email-validator");
var bookl = monogojs('roombooking', ['bookingapplications']);

var db = monogojs('roombooking', ['users']);
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
module.exports=function(app){
app.get("/admin", function (req, res) {
    res.render('pages/admin', {
        title: 'Admin Panel'
    });
});

app.post('/admin',urlencoderParser, function (req, res) {
    var uid = req.body.userid;
    var upass = req.body.password;
    db.admin.findOne({
        $and: [{
            "userid": uid
        }, {
            "password": upass
        }]
    }, function (err, doc) {
        req.session.userid = uid;
        res.redirect("/adminpanel");
    });
});
app.get('/adminpanel', function (req, res) {
    if (req.session.userid) {
        bookl.bookingapplications.find(function (err, docs) {
            res.render('pages/adminpanel', {
                title: "Admin Panel",
                username: req.session.userid,
                bookinglist: docs

            });

        });
    } else {
        // res.send("<script>alert('Please Login to continue')</script>");
        res.redirect('/admin');
    }
});

app.get('/bookvenue',function(req,res){
    if(req.session.userid){
        res.render('bookvenue',{
            title:"New Booking"
        });
        
    }
    else{
        res.redirect('/admin');
    }
});
app.post('/bookvenue',urlencoderParser,function(req,res){
    bookl.bookingapplications.insert(req.body,function(err,doc){
        console.log(doc);
        res.redirect('/adminpanel');
    });
});
app.get('/newuser',function(req,res){
    if(req.session.userid){
        db.users.find(function(err,docs){
            res.render('pages/newuser',{
            title:'Admin Panel',
            username:req.session.userid,
            userlist:docs});
        });
    }
    else{
        res.redirect('/admin');
    }
});
app.get('/adminregister', function (req, res) {
    res.render('pages/register', {
        title: 'Register new Admin'
    });
});
app.post('/adminregister',urlencoderParser, function (req, res) {
    var em=req.body.userid;
    console.log(em);
    // if(validator.validate(em)){
    db.admin.insert(req.body, function (err, doc) {
        console.log(doc);
        // res.setHeader('Content-Type', 'text/plain');
        res.redirect('/admin');
    });
// }
// else{
//     res.send("<script>alert('Please Login to continue')</script>");
//     res.redirect('/adminregister');
// }

});


app.get("/confirm/:id", function (req, res) {
    if (req.session.userid) {
        var i = req.params.id;

        console.log(i);
        bookl.bookingapplications.findOne({
            _id: new ObjectID(i)
        }, function (err, doc) {
            console.log(doc);
            res.render('pages/confirm', {
                title: "Modify details",
                bookingg: doc
            });
        });
    } else {
        // res.send("<script>alert('Please Login to continue')</script>");
        res.redirect('/admin');
    }

});

app.post('/confirm/:id',urlencoderParser, function (req, res) {
    var id = req.params.id;
    console.log(id);
    bookl.bookingapplications.findAndModify({
        query: {
            _id: new ObjectID(id)
        },
        update: {
            $set: {
                status: "Confirmed"
            }
        },
        new: true
    }, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            console.log(doc);
            var transporter = nodeMailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'emailexampl1200@gmail.com',
                    pass: 'J.@8800.k'
                }
            });
            console.log(req.body.mailid);
            var mailOptions = {
                from: '"Jogender Yadav" <emailexampl1200@gmail.com>', // sender address
                to: "jogenderydv@gmail.com",
                // to:req.body.mailid, // list of receivers

                subject: "Booking Confirmation", // Subject line
                text: "Confirmed", // plain text body

                // html: '<b>NodeJS Email Tutorial</b>' // html body
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message %s sent: %s', info.messageId, info.response);
            });
            res.redirect('/adminpanel');
        }

    });
});
app.get("/reject/:id", function (req, res) {
    if (req.session.userid) {
        var i = req.params.id;

        console.log(i);
        bookl.bookingapplications.findOne({
            _id: new ObjectID(i)
        }, function (err, doc) {
            console.log(doc);
            res.render('pages/reject', {
                title: "Modify details",
                booking: doc
            });
        });
    } else {
        // res.send("<script>alert('Please Login to continue')</script>");
        res.redirect('/admin');
    }
});

app.post('/reject/:id', urlencoderParser, function (req, res) {
    var id = req.params.id;
    console.log(id);
    bookl.bookingapplications.findAndModify({
        query: {
            _id: new ObjectID(id)
        },
        update: {
            $set: {
                status: "Rejected",
                reason: req.body.reason
            }
        },
        new: true
    }, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            console.log(doc);
            var transporter = nodeMailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'emailexampl1200@gmail.com',
                    pass: 'J.@8800.k'
                }
            });
            console.log(req.body.mailid);
            var mailOptions = {
                from: '"Jogender Yadav" <emailexampl1200@gmail.com>', // sender address
                to: "jogenderydv@gmail.com",
                // to:req.body.mailid, // list of receivers

                subject: "Booking Rejected", // Subject line
                text: "Rejected due to following "+"\n Reason:"+req.body.reason, // plain text body

                // html: '<b>NodeJS Email Tutorial</b>' // html body
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message %s sent: %s', info.messageId, info.response);
            });
            res.redirect('/adminpanel');
        }
    });
});





app.post('/employee/:id',urlencoderParser,function(req,res){
    // console.log(req.body);
    // db.users.insert(req.body,function(err,doc){
    //     res.json(doc);
    // });

    var id = req.params.id;
    console.log("id nnnc    "+id);
    db.users.findAndModify({
        query: {
            _id: new ObjectID(id)
        },
        update: {
            $set: {
                role: "User_Verified"
            }
        },
        new: true
    }, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            console.log("docs    "+doc);
            var transporter = nodeMailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'emailexampl1200@gmail.com',
                    pass: 'J.@8800.k'
                }
            });
            console.log(req.body.mailid);
            var mailOptions = {
                from: '"Jogender Yadav" <emailexampl1200@gmail.com>', // sender address
                to: "jogenderydv@gmail.com",
                // to:req.body.mailid, // list of receivers

                subject: "User Confirmation", // Subject line
                text: "Successfully Verified", // plain text body

                // html: '<b>NodeJS Email Tutorial</b>' // html body
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message %s sent: %s', info.messageId, info.response);
            });
            // res.redirect('/newuser');
            res.json(doc);
        }

    });



});

app.delete('/employee/:id',function(req,res){
    var idd = req.params.id;
    console.log("iddddd       "+idd);

    if(req.session.userid){
        db.users.remove({_id: new ObjectID(idd)},function(err,doc){
            // res.redirect('/admin');
            // ,{
            // title:'Admin Panel',
            // username:req.session.userid,
            // userlist:doc});
            res.json(doc);
        });
    }
    else{
        res.redirect('/admin');
    }
});

app.get("/logout", function (req, res) {
    req.session.destroy();
    res.redirect('/admin');
});
}