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
    price: {
        type: Number,
        required: true
    }
});

const Listing = mongoose.model("Listing", data);
module.exports = Listing;