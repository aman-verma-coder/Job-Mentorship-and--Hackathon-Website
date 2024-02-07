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
    number: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    college: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    }
});

const Appliedforhackathon = mongoose.model("Appliedforhackathon", data);
module.exports = Appliedforhackathon;