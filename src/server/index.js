const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv").config();

const app = express();
const PORT = process.env.SERVER_PORT;

if (dotenv.error) {
    throw dotenv.error;
}
// console.log(dotenv.parsed);

// set headers for weather API query
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
        lng = req.query.lng,
        units = req.query.units,
        result = {};
    try {
        var response = await axios.get(
            `https://api.darksky.net/forecast/${API}/${lat},${lng}`,
            {
                params: { units }
            }
        );
        result = response.data;
    } catch (error) {
        console.log("Error", error);
        result = {
            error: response.data.error
        };
    }
    res.send(result);
});

// Google Geocode API proxy
app.get("/geocode", async (req, res) => {
    const API = process.env.GOOGLE_API;
    const params = { key: API, ...req.query };
    let result = {};
    try {
        var response = await axios.get(
            "https://maps.googleapis.com/maps/api/geocode/json",
            { params }
        );
        const lat = response.data.results[0].geometry.location.lat,
            lng = response.data.results[0].geometry.location.lng,
            name = response.data.results[0].formatted_address,
            id = response.data.results[0].place_id;
        result = { id, name, lat, lng };
    } catch (error) {
        result = {
            error: response.data.error_message
        };
    }
    res.send(result);
});

app.listen(PORT);
console.log("Server running on port %d", PORT);
