const PORT = process.env.PORT || 4000;
var express=require("express");
var bodyParser=require("body-parser");

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

const path = require('path');
app.use(express.static(path.join(__dirname+'/public')));


app.use('/', require('./routes/index'));


app.post('/patientSignUp', async(req,res)=>{
    try{
        console.log(req.body);
        var d = req.body;
        var email = d['email'];
        const r1 = await patientDetails.findOne({email:email});
        if(r1){
            res.render('fail');
        }
        else{
            var insertingObject = new PatientDetails(d)
            await insertingObject.save();
            res.render('success');
        }
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
        var email = d['email'];
        const r1 = await StaffDetails.findOne({email:email});
        if(r1){
            res.render('fail');
        }
        else{
            var insertingObject = new StaffDetails(d)
            await insertingObject.save();
            res.render('success');
        }
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
        var email = d['email'];
        const r1 = await PatientTransferDetails.findOne({email:email});
        if(r1){
            var insertingObject = new PatientTransferDetails(d)
            await insertingObject.save();
            res.render('success');
        }
        else{
            res.render('fail');
        }
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
        var hid = d['hospitalRegistrationNumber'];
        var id = d['email'];
        const r1 = await HospitalDetails.findOne({hid:hid});
        const r2 = await HospitalDetails.findOne({id:id});
        if(r1 || r2){
            res.send({message:"email or registration number already exits"});
        }
        else{
            var insertingObject = new HospitalDetails(d);
            await insertingObject.save();   
            res.send({message:"OOOKKKK"});
        }
    }
    catch(err){
            console.log("Err -- ", err);
            res.redirect(__dirname+'/views/index.html')
            return; 
    }
})

app.get('/index',(req,res)=>{
    res.render('index')
})
app.post('/hey',(req,res)=>{
    res.send({message:"working fine"});
})


app.get('/patient-profile',(req,res)=>{
    res.render('patientprofile');
})

app.get('/shift-patient',(req,res)=>{
    res.render('transfer');
})

app.get('/staff-profile',(req,res)=>{
    res.render('staffprofile');
})

app.get('/register-hospital',(req,res)=>{
    res.render('hospital');
})

app.get('/register-patient',(req,res)=>{
    res.render('patientRegistration');
})



var server = require('http').createServer(app);
server.listen(PORT, () => {console.log("Server started at "+PORT)});

    




