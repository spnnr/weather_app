const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv").config();
const path = require("path");

const app = express();

if (process.env.NODE_ENV !== "production") {
    if (dotenv.error) {
        throw dotenv.error;
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "NotFoundError";
        this.response = {
            status: 404,
            statusText: message
        };
    }
}

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "/build")));

// set headers for weather API query
app.use("/api/weather", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// Darksky API proxy
// TODO add success status codes
app.get("/api/weather", async (req, res) => {
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
        // console.log("================= WEATHER =================\n", error);
        result = {
            status: error.response.status,
            error: error.response.statusText
        };
    } finally {
        res.send(result);
    }
});

// Google Geocode API proxy
// TODO add success status codes
app.get("/api/geocode", async (req, res) => {
    const API = process.env.GOOGLE_API;
    const params = { key: API, ...req.query };
    let result = {};
    try {
        var response = await axios.get(
            "https://maps.googleapis.com/maps/api/geocode/json",
            { params }
        );
        if (response.data.results.length === 0) {
            throw new NotFoundError("Address not found");
        }
        const lat = response.data.results[0].geometry.location.lat,
            lng = response.data.results[0].geometry.location.lng,
            name = response.data.results[0].formatted_address,
            id = response.data.results[0].place_id;
        result = { id, name, lat, lng };
    } catch (error) {
        // console.log("================= GEOCODE =================\n", error);
        result = {
            status: error.response.status,
            error: error.response.statusText
        };
    } finally {
        // check something
        res.send(result);
    }
});

// For any request that does not match one of the above
// return the React app
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/build/index.html"));
});

let port = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
    app.listen(process.env.PORT || 5000);
} else {
    app.listen(process.env.SERVER_PORT || 5000);
}

console.log("Server running on port %d", port);
