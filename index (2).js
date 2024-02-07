const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const path = require("path");
const { name } = require("ejs");

// app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.get("/mentorship", (req, res) => {
    res.send("All Ok");
});


app.listen(port, () => {
    console.log(`You are listening on ${port}`);
});