// const { number } = require("joi");
const mongoose = require("mongoose");
// const schema = mongoose.Schema;

const data = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        type: String,
        required: true
    },
    venue: {
        type: String,
        required: true
    }
});

const Hack = mongoose.model("Hack", data);
module.exports = Hack;