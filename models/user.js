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
        required: [true, "Age of patient is required"]
    },
    gender: {
        type: String,
        required: [true, "Gender of patient is required"]
    },
    email: {
        type: String,
        required: [true, "Email of patient is required"]
    },
    password: {
        type: String,
        required: [true, "Password of patient is required"]
    },
    hid:{
        type: String,
        required: [true, "Cureent Hospital Name is required"]
    },
    diagnosis: {
        type: String,
        required: [false, "Symptomps and diagnostics of the patient"]
    }
})

//Hospitial Staff Details
const staffDetails = new Schema({
    name: {
        type: String,
        required: [true, "Staff Member name is required"]
    },
    email: {
        type: String,
        required: [true, "Staff Member email is required"]
    },
    role: {
        type: String,
        required: [true,"Role of incharge is required"]
    },
    hospitalRegistrationNumber: {
        type: String,
        required: [true, "Staff Member's working hospital number is required"]
    },
    password: {
        type: String,
        required: [true, "Staff Member password is required"]
    }
})

//Hospital Details Schema
const hospitalDetails = new Schema({
    name: {
        type: String,
        required: [true,"Name of the hospital is required"]
    },
    phone:{
        type: Number,
        required: [true,"Phone Number of Hospital Required"]
    },
    email:{
        type: String,
        required: [true,"Email of hospital is requierd"]
    },
    facilities: {
        type: String,
        required: [true,"Facilities of the hospital is required"]
    },
    address: {
        type: String,
        required: [true,"Address of the hospital is required"]
    },
    hospitalRegistrationNumber: {
        type: String,
        required: [true,"Hospital Registration Number is required"]
    }
})

//patient transfer detials
const patientTransferDetails = new Schema({
    name: {
        type: String,
        required: [true, "Name of transfering patient is required"]
    },
    emailOfPatient: {
        type: String,
        required: [true, "Email of transfering patient is required"]
    },
    fromName: {
        type: String,
        required: [true, "From hospital name of transfering patient is required"]
    },
    fromId: {
        type: String,
        required: [true, "From hospital id of transfering patient is required"]
    },
    toName: {
        type: String,
        required: [true, "To hospital name of transfering patient is required"]
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


const PatientDetails = mongoose.model("PatientDetails", patientDetails);
const StaffDetails = mongoose.model("StaffDetails", staffDetails);
const HospitalDetails = mongoose.model("HospitalDetails", hospitalDetails);
const PatientTransferDetails = mongoose.model("PatientTransferDetails", patientTransferDetails);
module.exports = {PatientDetails,StaffDetails,HospitalDetails,PatientTransferDetails};