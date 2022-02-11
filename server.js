const PORT = process.env.PORT || 4000;
var express=require("express");
var bodyParser=require("body-parser");


const mongoose = require('mongoose');
const connectDB = require('./config/db');
connectDB();
var app=express()

var engine = require('consolidate');
app.set('views', __dirname + '/views');
app.engine('html', engine.mustache);
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
   extended: true
}));


app.use('/', require('./routes/index'));


app.post('/upp', async(req,res)=>{
    try{
        console.log(req.body);
        var d = req.body;
        var name = d['name'];
        var email = d['email'];
        var age = d['age'];
        var gender = d['gender'];
        var password = d['password'];
        console.log(name);
        console.log(email);
        console.log(password);
        console.log(age);
        console.log(gender);
        return res.redirect('/');
    }
    catch(err){
        console.log("Err -- ", err);
        res.sendFile(__dirname+'/views/index.html' )
        return;
    }
})

var server = require('http').createServer(app);

server.listen(PORT, () => {console.log("Server started at "+PORT)});

    




