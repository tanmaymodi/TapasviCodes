const mongoose = require('mongoose');
const Schema = mongoose.Schema
//patient details schema
const patientDetails = new Schema({
    name: {
        type: String,
        required: [true, "Nmae of patient is required"]
    }, 
    age: {
        type: Number,
        required: [ture, "Age of patient is required"]
    },
    gender: {
        type: String,
        required: [ture, "Gender of patient is required"]
    },
    email: {
        type: Email,
        required: [ture, "Email of patient is required"]
    },
    password: {
        type: password,
        required: [ture, "Password of patient is required"]
    },
    diagnosis: {
        type: String,
        required: [false, "Symptomps and diagnostics of the patient"]
    }
})

//Hostial Staff Details
const staffDetails = new Schema({
    name: {
        type: String,
        required: [true, "Staff Member name is required"]
    },
    email: {
        type: Email,
        required: [true, "Staff Member email is required"]
    },
    hospitalRegistrationNumber: {
        type: String,
        required: [true, "Staff Member's working hospital number is required"]
    },
    password: {
        type: password,
        required: [true, "Staff Member password is required"]
    }
})

//Hospital Details Schema
const hospitalDetails = new Schema({
    name: {
        type: String,
        required: [true,"Name of the hospital is required"]
    },
    facilities: {
        type: String,
        required: [true,"Facilities of the hospital is required"]
    },
    address: {
        type: String,
        required: [true,"Address of the hospital is required"]
    },
    numberOfBeds: {
        type: Number,
        required: [true,"Number of the hospital is required"]
    },
    hospitalRegistrationNumber: {
        type: String,
        required: [ture,"Hospital Registration Number is required"]
    }
})

//patient transfer detials
const patientTransferDetails = new Schema({
    name: {
        type: String,
        required: [true, "Name of transfering patient is required"]
    },
    emailOfPatient: {
        type: Email,
        required: [true, "Email of transfering patient is required"]
    },
    fromId: {
        type: String,
        required: [true, "From hospital id of transfering patient is required"]
    },
    toId: {
        type: String,
        required: [true, "To hospital id of transfering patient is required"]
    },
    date: {
        type: Date,
        required: [true, "Date of transfering patient is required"]
    },
    diagnosis: {
        type: String,
        required: [true, "Tests done so far of transfering patient is required"]
    }

})


const patientDetails = mongoose.model("patientDetails", patientDetails);
const staffDetails = mongoose.model("staffDetails", staffDetails);
const hospitalDetails = mongoose.model("hospitalDetails", hospitalDetails);
const patientTransferDetails = mongoose.model("patientTransferDetails", patientTransferDetails);
module.exports = {patientDetails,staffDetails,hospitalDetails,patientTransferDetails};