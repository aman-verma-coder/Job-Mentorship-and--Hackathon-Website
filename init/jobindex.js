const express = require("express");
const mongoose = require("mongoose");
const initdata = require("./jobdata.js");
const Job = require("../models/jobListing.js");
const mongo_url = 'mongodb://127.0.0.1:27017/mentorship';

main()
    .then(() => { console.log("Connected to DB") })
    .catch((err) => { console.log(err) });

async function main() {
    await mongoose.connect(mongo_url);
}

const initDB = async () => {
    await Job.deleteMany({});
    await Job.insertMany(initdata.data);
    let mendata = initdata.data;
    console.log(mendata);
    console.log("Data was initialized");
}

initDB();