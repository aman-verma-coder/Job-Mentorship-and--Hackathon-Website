// const { number } = require("joi");
const mongoose = require("mongoose");
// const schema = mongoose.Schema;

const data = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    skills: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    salary: {
        type: Number,
        required: true
    }
});

const Job = mongoose.model("Job", data);
module.exports = Job;