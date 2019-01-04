import React, { Component } from "react";
import axios from "axios";

// components
import BasicWeather from "./BasicWeather";
import DefaultButton from "./DefaultButton";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";

// App
class App extends Component {
    state = {
        lat: 0,
        lng: 0,
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
        }
    };

    onSearchSubmit = async term => {
        let response = {};
        try {
            response = await axios.get("/geocode", {
                params: { address: term }
            });

            const lat = response.data.results[0].geometry.location.lat,
                lng = response.data.results[0].geometry.location.lng,
                location = response.data.results[0].formatted_address;

            this.setState({ lat, lng, location }, () => {
                this.requestWeather();
            });
        } catch (error) {
            console.log(error);
        }
    };

    onLocationRequest = () => {
        window.navigator.geolocation.getCurrentPosition(
            async position => {
                let response = {};
                const lat = position.coords.latitude.toFixed(7),
                    lng = position.coords.longitude.toFixed(7);
                // get location name from google geocode api
                try {
                    response = await axios.get("/geocode", {
                        params: { latlng: `${lat},${lng}` }
                    });
                    const location = response.data.results[0].formatted_address;
                    this.setState({ lat, lng, location }, () =>
                        this.requestWeather()
                    );
                } catch (error) {
                    console.log(error);
                }
            },
            error => {
                console.log(error);
            }
        );
    };

    requestWeather = async () => {
        let response = {};
        try {
            response = await axios.get("/weather", {
                params: {
                    lat: this.state.lat,
                    lng: this.state.lng
                }
            });
            this.setState({
                weather: response.data
            });
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        return (
            <div>
                <Navbar>
                    <SearchBar
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
                    <div className="row align-items-center mb-4 mt-4">
                        <BasicWeather
                            location={this.state.location}
                            weather={this.state.weather}
                        />
                    </div>
                </main>
            </div>
        );
    }
}

export default App;
