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
    }
});

const Mentor = mongoose.model("Mentor", data);
module.exports = Mentor;