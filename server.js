const PORT = process.env.PORT || 4000;
var express=require("express");
var bodyParser=require("body-parser");


const mongoose = require('mongoose');
const connectDB = require('./config/db');
connectDB();
var url = 'mongodb+srv://tanmaymodi:HomeSweetHomE@cluster0.ulutu.mongodb.net/se?retryWrites=true&w=majority';
var app=express()

var engine = require('consolidate');
app.set('views', __dirname + '/views');
app.engine('html', engine.mustache);
app.set('view engine', 'html');
app.use('/', require('./routes/index'));

var server = require('http').createServer(app);

server.listen(PORT, () => {console.log("Server started at "+PORT)});

    




