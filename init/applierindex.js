const express = require("express");
const mongoose = require("mongoose");
const initdata = require("./applierdata.js");
const Appliedforhackathon = require("../models/applyListing.js");
const mongo_url = `mongodb+srv://${process.env.ATLAS_USER}:${encodeURIComponent(process.env.ATLAS_PASS)}@${process.env.CLUSTER_URL}/mentorship?retryWrites=true&w=majority&appName=Cluster0&tls=true&tlsAllowInvalidCertificates=true`;

main()
    .then(() => { console.log("Connected to DB") })
    .catch((err) => { console.log(err) });

async function main() {
    await mongoose.connect(mongo_url);
}

const initDB = async () => {
    await Appliedforhackathon.deleteMany({});
    await Appliedforhackathon.insertMany(initdata.data);
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