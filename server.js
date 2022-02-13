const PORT = process.env.PORT || 4000;
var express = require("express");
var bodyParser = require("body-parser");

const connectDB = require('./config/db');
connectDB();
var app = express()

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
app.use(express.static(path.join(__dirname + '/public')));


app.use('/', require('./routes/index'));


app.post('/patientSignUp', async(req, res) => {
    try {
        console.log(req.body);
        var d = req.body;
        //console.log(d);
        var email = d['email'];
        const r1 = await PatientDetails.findOne({ email: email });
        if (r1) {
            res.send({ message: "email already exits please use different email" });
        } else {
            var insertingObject = new PatientDetails(d)
            await insertingObject.save();
            res.send({ message: "sign up successful" });
        }
    } catch (err) {
        console.log("Err -- ", err);
        res.sendFile(__dirname + '/views/index.html')
        return;
    }
})

app.post('/staffSignUp', async(req, res) => {
    try {
        console.log(req.body);
        var d = req.body;
        var email = d['email'];
        const r1 = await StaffDetails.findOne({ email: email });
        if (r1) {
            res.send({ message: "SignUP failed email already exits" });
        } else {
            var insertingObject = new StaffDetails(d)
            await insertingObject.save();
            res.send({ message: "Sign UP successful" });
        }
    } catch (err) {
        console.log("Err -- ", err);
        res.sendFile(__dirname + '/views/index.html')
        return;
    }
})

app.post('/patientTransferForm', async(req, res) => {
    try {
        console.log(req.body);
        var d = req.body;
        var email = d['emailOfPatient'];
        const r1 = await PatientDetails.findOne({ email: email });
        console.log(r1);
        if (r1) {
            var insertingObject = new PatientTransferDetails(d)
            await insertingObject.save();
            res.send({ message: "Patient transfer form filled sucessfully" });
        } else {
            res.send({ message: "Try to fill the form with registered email" })
        }
    } catch (err) {
        console.log("Err -- ", err);
        res.sendFile(__dirname + '/views/index.html')
        return;
    }
})

app.post('/hospitalSignUp', async(req, res) => {
    try {
        console.log(req.body);
        var d = req.body;
        var hid = d['hospitalRegistrationNumber'];
        var id = d['email'];
        const r1 = await HospitalDetails.findOne({ hospitalRegistrationNumber: hid });
        const r2 = await HospitalDetails.findOne({ email: id });
        if (r2) {
            res.send({ message: "email already exits" });
        } else if (r1) {
            res.send({ message: "registration number already exits" })
        } else {
            var insertingObject = new HospitalDetails(d);
            await insertingObject.save();
            res.send({ message: "Hospital Registered Sucessfully" });
        }
    } catch (err) {
        console.log("Err -- ", err);
        res.redirect(__dirname + '/views/index.html')
        return;
    }
})

app.get('/index', (req, res) => {
    res.render('index')
})
app.post('/hey', (req, res) => {
    res.send({ message: "working fine" });
})


app.get('/patient-profile', (req, res) => {
    res.render('patientprofile');
})

app.get('/shift-patient', (req, res) => {
    res.render('transfer');
})

app.get('/staff-profile', (req, res) => {
    res.render('staffprofile');
})

app.get('/register-hospital', (req, res) => {
    res.render('hospital');
})

app.get('/register-patient', (req, res) => {
    res.render('patientRegistration');
})

app.get('/register-staff', (req, res) => {
    res.render('staffRegistration')
})


app.post('/patientSignIn', async(req, res) => {
    try {

        var d = req.body;
        console.log(d);
        const result = await PatientDetails.findOne(d);
        const rec = await PatientTransferDetails.findOne({ emailOfPatient: d['email'] });

        console.log("pat sign in");
        console.log(result, rec);
        if (result !== null || rec !== null) {
            res.send({ message: result, rec: rec, success: true });
        } else {
            res.send({ message: "Invalid email or password", success: false });
        }
    } catch (err) {
        console.log("Err -- ", err);
        res.redirect(__dirname + '/views/index.html')
        return;
    }
})


app.post('/staffSignIn', async(req, res) => {
    try {

        var d = req.body;
        console.log(d);
        const result = await StaffDetails.findOne(d);
        console.log(result);
        if (result) {
            res.send({ message: result, success: true });
        } else {
            res.send({ message: "Invalid email or password", success: false });
        }
    } catch (err) {
        console.log("Err -- ", err);
        res.redirect(__dirname + '/views/index.html')
        return;
    }
})



var server = require('http').createServer(app);
server.listen(PORT, () => { console.log("Server started at " + PORT) });