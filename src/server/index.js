const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv").config();

const app = express();
const PORT = process.env.SERVER_PORT;

if (dotenv.error) {
    throw dotenv.error;
}
// console.log(dotenv.parsed);

app.use("/weather", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// Darksky API proxy
app.get("/weather", async (req, res) => {
    // console.log(req.query);
    const API = process.env.DARKSKY_API;
    let lat = req.query.lat,
        lng = req.query.lng;
    let response = await axios.get(
        `https://api.darksky.net/forecast/${API}/${lat},${lng}`
    );
    res.send(response.data);
});

// Google Geocode API proxy
app.get("/geocode", async (req, res) => {
    const API = process.env.GOOGLE_API;
    let params = { key: API, ...req.query };

    let response = await axios.get(
        "https://maps.googleapis.com/maps/api/geocode/json",
        { params }
    );

    res.send(response.data);
});

app.listen(PORT);
console.log("Server running on port %d", PORT);
