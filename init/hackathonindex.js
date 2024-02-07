const express = require("express");
const mongoose = require("mongoose");
const initdata = require("./hackathondata.js");
const Hack = require("../models/hackathonListing.js");
const mongo_url = 'mongodb://127.0.0.1:27017/mentorship';

main()
    .then(() => { console.log("Connected to DB") })
    .catch((err) => { console.log(err) });

async function main() {
    await mongoose.connect(mongo_url);
}

const initDB = async () => {
    await Hack.deleteMany({});
    await Hack.insertMany(initdata.data);
    let mendata = initdata.data;
    console.log(mendata);
    console.log("Data was initialized");
}

initDB();

// let toInsert = new Listing({
//     title: "JEE Advanced",
//     description:
//         "Crack JEE Advanced exam by knowing the correct path",
//     image: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
//     price: 25000
// });

// toInsert
//     .save()
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });