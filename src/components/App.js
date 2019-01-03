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
        weather: {}
    };

    onSearchSubmit = async term => {
        let response = {};
        try {
            response = await axios.get("/geocode", {
                params: { address: term }
            });
            const location = response.data.results[0].geometry.location;

            this.setState(
                {
                    lat: location.lat,
                    lng: location.lng,
                    location: response.data.results[0].formatted_address
                },
                () => {
                    this.requestWeather();
                }
            );
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
                    this.setState(
                        {
                            lat,
                            lng,
                            location: response.data.results[0].formatted_address
                        },
                        () => this.requestWeather()
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
                <Navbar appName="PhotoWeather">
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
                    <BasicWeather
                        location={this.state.location}
                        weather={this.state.weather}
                    />
                </main>
            </div>
        );
    }
}

export default App;
