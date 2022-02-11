var express=require("express");
var bodyParser=require("body-parser");

const mongoose = require('mongoose');
const { response } = require("express");
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
   console.log("connection succeeded");
});
var app=express()

var engine = require('consolidate');
app.set('views', __dirname + '/public');
app.engine('html', engine.mustache);
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
   extended: true
}));


