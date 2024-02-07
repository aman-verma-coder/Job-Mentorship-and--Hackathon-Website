// const { number } = require("joi");
const mongoose = require("mongoose");
// const schema = mongoose.Schema;

const data = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contactno: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
});

const Contact = mongoose.model("Contact", data);
module.exports = Contact;