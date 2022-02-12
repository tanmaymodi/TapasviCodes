const PORT = process.env.PORT || 4000;
var express=require("express");
var bodyParser=require("body-parser");


const mongoose = require('mongoose');
const connectDB = require('./config/db');
connectDB();
var app=express()

var engine = require('consolidate');
const { patientDetails, PatientDetails, StaffDetails, HospitalDetails, PatientTransferDetails } = require("./models/user");
app.set('views', __dirname + '/views');
app.engine('html', engine.mustache);
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
   extended: true
}));


app.use('/', require('./routes/index'));


app.post('/patientSignUp', async(req,res)=>{
    try{
        console.log(req.body);
        var d = req.body;
        var insertingObject = new PatientDetails(d)
        await insertingObject.save();
        return res.redirect('/');
    }
    catch(err){
        console.log("Err -- ", err);
        res.sendFile(__dirname+'/views/index.html' )
        return;
    }
})

app.post('/staffSignUp',async(req,res)=>{
    try{
        console.log(req.body);
        var d = req.body;
        var insertingObject = new StaffDetails(d);
        await insertingObject.save();   
        return res.redirect('/');
    }
    catch(err){
            console.log("Err -- ", err);
            res.sendFile(__dirname+'/views/index.html' )
            return;
    }
})

app.post('/hospitalSignUp',async(req,res)=>{
    try{
        console.log(req.body);
        var d = req.body;
        var insertingObject = new HospitalDetails(d);
        await insertingObject.save();   
        return res.redirect('/');
    }
    catch(err){
            console.log("Err -- ", err);
            res.sendFile(__dirname+'/views/index.html' )
            return;
    }
})


app.post('/patientTransferForm',async(req,res)=>{
    try{
        console.log(req.body);
        var d = req.body;
        var insertingObject = new PatientTransferDetails(d);
        await insertingObject.save();   
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

    




