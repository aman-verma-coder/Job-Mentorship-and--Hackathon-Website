const express = require("express");
const dotenv = require('dotenv');
dotenv.config();

// Validate required environment variables
['ATLAS_USER', 'ATLAS_PASS', 'CLUSTER_URL'].forEach(v => {
    if (!process.env[v]) {
        console.error(`Missing required environment variable: ${v}`);
        process.exit(1);
    }
});

const app = express();
const port = 3000;
const mongoose = require("mongoose");
const path = require("path");
const mongo_url = `mongodb+srv://${process.env.ATLAS_USER}:${encodeURIComponent(process.env.ATLAS_PASS)}@${process.env.CLUSTER_URL}/mentorship?retryWrites=true&w=majority`;
// const mongo_url = process.env.ATLASDB_URL;
const Listing = require("./models/listings.js");
const Mentor = require("./models/mentorListing.js");
const Contact = require("./models/contactListing.js");
const Hack = require("./models/hackathonListing.js");
const Appliedforhackathon = require("./models/applyListing.js");
const { name } = require("ejs");
const ejsMate = require('ejs-mate');
const User = require("./models/usersignup.js");

main()
    .then(() => { console.log("Connection Successful") })
    .catch((err) => { console.log(err) });


async function main() {

    try {
        await mongoose.connect(mongo_url, {
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

// app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.engine('ejs', ejsMate);

// app.get("/", async (req, res) => {
//     res.send("Response Received");
//     // res.render("index.ejs");
// });

// let newData = new Listing({
//     title: "JEE Main",
//     description: "Crack JEE Main exam by knowing the correct path",
//     image: "https://drive.google.com/file/d/1tpW9hLhQPj547j-F8SfKrJA46TOQuMGf/view?usp=drive_link",
//     price: 15000
// });

// newData.save();

app.get("/", (req, res) => {
    res.render("home.ejs");
});


app.get("/mentor", async (req, res) => {
    let allListings = await Listing.find({});
    res.render("index.ejs", { allListings });
    // console.log(allListings);
    // res.send("All Ok");
});

app.get("/mentor/:id/show", async (req, res) => {
    let { id } = req.params;
    console.log(id);
    let showData = await Listing.findById(id);
    // console.log(showData);
    // let allListings = await Listing.find({});
    // res.render("index.ejs", { allListings });
    // console.log(allListings);
    // res.send("All Ok");
    let allMentors = await Mentor.find({});
    console.log(allMentors);
    res.render("show.ejs", { showData, allMentors });
})

app.post("/mentor/:id/buy", async (req, res) => {
    let { id } = req.params;
    let buydata = await Listing.findById(id);
    console.log(`Buying Data:${buydata}`);
    let mentorname = req.body;
    console.log(mentorname.Mentor);
    let mentordata = await Mentor.find({ name: mentorname.Mentor });
    console.log(mentordata);
    res.send("All Ok");
})

app.post("/mentor/show/contact", async (req, res) => {
    let newContact = req.params;
    // await newContact.save();
    console.log(newContact);
    res.send("All Ok");
})

app.get("/hackathon", async (req, res) => {
    let allHackathons = await Hack.find({});
    console.log(allHackathons);
    res.render("hackathon.ejs", { allHackathons });
})

app.get("/hackathon/new", (req, res) => {
    let { id } = req.params;
    console.log(id);
    res.render("hackathonnew.ejs");
})

app.post("/hackathon/new", (req, res) => {
    const newhack = new Hack(req.body);
    newhack.save();
    console.log(newhack);
    // console.log(abcd);
    res.redirect("http://localhost:8080/hackathon");
})

app.get("/hackathon/apply", (req, res) => {
    res.render("hackathonapply.ejs");
})

app.post("/hackathon/apply", (req, res) => {
    const newapplier = new Appliedforhackathon(req.body);
    // const newapplier = (req.body);
    newapplier.save();
    console.log(newapplier);
    // // console.log(abcd);
    res.send(`Hello ${newapplier.name}. You have successfully applied for the hackathon`);
    // res.redirect("http://localhost:8080/hackathon");
})

app.get("/hackathon/admin", (req, res) => {
    res.render("admin.ejs");
})

app.post("/hackathon/admin/verification", async (req, res) => {
    // const newapplier = new Appliedforhackathon(req.body);
    const admindata = (req.body);
    // newapplier.save();
    console.log(admindata);
    if (admindata.email == "admin@gmail.com" && admindata.password == "adminbro") {
        const admindata = await Appliedforhackathon.find({});
        console.log(`For Admin: ${admindata}`);
        res.render("adminpage.ejs", { admindata });
    } else {
        res.send("Something Wrong");
    }
    // // console.log(abcd);
    // res.send(`Hello ${newapplier.name}. You have successfully applied for the hackathon`);
    // res.redirect("http://localhost:8080/hackathon");
})

app.get("/job", (req, res) => {
    res.send("Job Page");
})

app.get("/signup", (req, res) => {
    res.render("signup.ejs");
})

app.post("/signup", async (req, res) => {
    let signupdata = new User(req.body);
    let signupemaildata = await User.findOne({ email: (signupdata.email) });
    console.log(signupemaildata);
    if (!signupemaildata) {
        signupdata.save();
        res.send("All Ok");
    } else {
        res.send("Email already exists! Try logging in.");
    }
    // res.send("All Ok");
})

app.get("/login", (req, res) => {
    res.render("login.ejs");
})

app.post("/login", async (req, res) => {
    let logindata = req.body;
    let userinfo = await User.findOne({ email: logindata.email });
    console.log(userinfo);
    console.log(logindata.password);
    if (userinfo) {
        console.log(userinfo.password);
        if ((userinfo.email == logindata.email) && (userinfo.password == logindata.password)) {
            res.send("All Ok");
        } else {
            res.send("Incorrect Email or Password");
        }
    } else {
        res.send("User not found");
    }
    // res.send("All Ok");
})

app.listen(port, () => {
    console.log(`You are listening on ${port}`);
});