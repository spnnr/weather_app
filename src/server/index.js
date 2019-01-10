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
    try {
        var response = await axios.get(
            `https://api.darksky.net/forecast/${API}/${lat},${lng}`
        );
    } catch (error) {
        console.log("Error", error);
        response = {
            weather: {},
            error
        };
    }
    res.send(response.data);
});

// Google Geocode API proxy
app.get("/geocode", async (req, res) => {
    const API = process.env.GOOGLE_API;

    let params = { key: API, ...req.query },
        lat = null,
        lng = null,
        location = "",
        result = {};
    try {
        var response = await axios.get(
            "https://maps.googleapis.com/maps/api/geocode/json",
            { params }
        );
        lat = response.data.results[0].geometry.location.lat;
        lng = response.data.results[0].geometry.location.lng;
        location = response.data.results[0].formatted_address;
        result = { lat, lng, location };
    } catch (error) {
        result = {
            error: response.data.error_message
        };
    }
    res.send(result);
});

app.listen(PORT);
console.log("Server running on port %d", PORT);
