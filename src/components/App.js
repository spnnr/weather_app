import React, { Component } from "react";
import axios from "axios";

// components
import BasicWeather from "./BasicWeather";
import DefaultButton from "./DefaultButton";
import Navbar from "./Navbar";
import Search from "./Search";
import Alert from "./Alert";
import Footer from "./Footer";

// css
import "../css/main.css";

// App
class App extends Component {
    state = {
        lat: null,
        lng: null,
        location: "",
        weather: {
            // latitude: 37.8267,
            // longitude: -122.4233,
            // timezone: "America/Los_Angeles",
            // currently: {
            //     time: 1546556988,
            //     summary: "Partly Cloudy",
            //     icon: "partly-cloudy-day",
            //     nearestStormDistance: 3,
            //     nearestStormBearing: 96,
            //     precipIntensity: 0,
            //     precipProbability: 0,
            //     temperature: 53.46,
            //     apparentTemperature: 53.46,
            //     dewPoint: 35.41,
            //     humidity: 0.5,
            //     pressure: 1021.23,
            //     windSpeed: 3.03,
            //     windGust: 8.03,
            //     windBearing: 38,
            //     cloudCover: 0.47,
            //     uvIndex: 1,
            //     visibility: 10,
            //     ozone: 270.44
            // },
            // minutely: {},
            // hourly: {},
            // daily: {},
            // flags: {},
            // offset: -8
        },
        error: "",
        status: ""
    };

    onSearchSubmit = async term => {
        this.setState({ status: "loading" });
        let response = await axios.get("/geocode", {
            params: { address: term }
        });
        if (response.data.hasOwnProperty("error")) {
            this.setState({ ...response.data, status: "error" });
            return;
        }
        this.setState(response.data, () => {
            this.requestWeather();
        });
    };

    onLocationRequest = () => {
        this.setState({ status: "loading" });
        window.navigator.geolocation.getCurrentPosition(
            async position => {
                let lat = position.coords.latitude.toFixed(7),
                    lng = position.coords.longitude.toFixed(7);
                let response = await axios.get("/geocode", {
                    params: {
                        latlng: `${lat},${lng}`
                    }
                });
                if (response.data.hasOwnProperty("error")) {
                    this.setState({ ...response.data, status: "error" });
                    return;
                }
                this.setState(response.data, () => {
                    this.requestWeather();
                });
            },
            error => {
                let result = {
                    lat: null,
                    lng: null,
                    location: "",
                    error,
                    status: "error"
                };
                this.setState(result);
            }
        );
    };

    requestWeather = async () => {
        var response = await axios.get("/weather", {
            params: {
                lat: this.state.lat,
                lng: this.state.lng
            }
        });
        console.log(response);

        let weather = response.data;
        response = { weather, status: "success" };
        this.setState(response);
    };

    render() {
        // console.log("App state:", this.state);
        return (
            <div>
                <Navbar>
                    <a className="navbar-brand" href="/">
                        WeatherApp
                    </a>
                    <Search
                        onSubmit={this.onSearchSubmit}
                        placeholder="Find location..."
                    />
                    <DefaultButton
                        onClick={this.onLocationRequest}
                        icon="fa-map-marker-alt"
                        btnType="secondary"
                    />
                </Navbar>
                <main className="container">
                    <Alert error={this.state.error} />
                    {/* need a weather container here */}
                    <div className="row align-items-center mb-4 mt-4">
                        <BasicWeather
                            location={this.state.location}
                            weather={this.state.weather}
                            status={this.state.status}
                        />
                    </div>
                </main>
                <Footer>
                    <p className="text-muted d-inline-block">
                        Created by Anton U
                    </p>
                </Footer>
            </div>
        );
    }
}

export default App;
