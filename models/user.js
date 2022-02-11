const mongoose = require('mongoose');
const Schema = mongoose.Schema

const FormSchema = new Schema({
    name: {
        type: String,
        required: [true, "Formname is required"]
    }, 
    fields: {
        type: Object,
        required: [true, "min no. of fields = 1"]
    }
})

const Form = mongoose.model("Form", FormSchema);
module.exports = Form;