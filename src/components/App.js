import React, { Component } from "react";
import axios from "axios";

// components
import WeatherList from "./WeatherList";
import DefaultButton from "./ui/DefaultButton";
import Navbar from "./ui/Navbar";
import Search from "./ui/Search";
import Alert from "./ui/Alert";
import Footer from "./ui/Footer";
import Spinner from "./ui/Spinner";

// css
import "../css/main.css";

// App
class App extends Component {
    state = {
        locations: [
            // { key: 1, name: "Moscow", lat: 55.755825, lng: 37.617298 },
            // { key: 2, name: "Vancouver", lat: 49.28273, lng: -123.120735 }
        ],
        error: "",
        forecastList: []
    };

    // used to handle error messages
    handleError = error => {
        console.log(error);
        this.setState({ error });
    };

    // adds location to a list of locations searched by a user
    addLocation = location => {
        if (location.hasOwnProperty("error")) {
            this.handleError(location.error);
            return;
        }
        this.setState(
            { locations: [...this.state.locations, location] },
            () => {
                this.requestWeather();
            }
        );
    };

    // builds forecast list with weather forecast for each location
    async requestWeather() {
        if (this.state.locations.length === 0) {
            return;
        }
        let forecastList = [];
        for (let i = 0; i < this.state.locations.length; i++) {
            try {
                const response = await axios.get("/weather", {
                    params: {
                        lat: this.state.locations[i].lat,
                        lng: this.state.locations[i].lng
                    }
                });
                const forecast = {
                    ...this.state.locations[i],
                    forecast: response.data
                };
                forecastList.push(forecast);
                this.setState({ forecastList });
            } catch (error) {
                this.props.handleError(error);
                return;
            }
        }
        this.setState({ forecastList, error: "" });
    }

    // handles search field request from the user
    onSearchSubmit = async term => {
        this.setState({ error: "" });
        let response = await axios.get("/geocode", {
            params: { address: term }
        });

        this.addLocation(response.data);
    };

    // handles geolocation request from the user
    onLocationRequest = () => {
        this.setState({ error: "" });
        window.navigator.geolocation.getCurrentPosition(
            async position => {
                let lat = position.coords.latitude.toFixed(7),
                    lng = position.coords.longitude.toFixed(7);
                let response = await axios.get("/geocode", {
                    params: {
                        latlng: `${lat},${lng}`
                    }
                });
                this.addLocation(response.data);
            },
            error => {
                this.handleError(error);
            }
        );
    };

    render() {
        console.log("App state", this.state);
        let content = (
            <div className="col">
                <p>
                    Search for a city or geolocate to see forecast for your
                    current location
                </p>
            </div>
        );
        if (
            this.state.locations.length > 0 &&
            this.state.forecastList.length < this.state.locations.length
        ) {
            content = <Spinner />;
        }
        if (
            this.state.locations.length > 0 &&
            this.state.forecastList.length > 0 &&
            this.state.locations.length === this.state.forecastList.length
        ) {
            content = (
                <WeatherList
                    forecastList={this.state.forecastList}
                    handleError={this.handleError}
                />
            );
        }
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
                    <div className="row align-items-center mb-4 mt-4">
                        {content}
                    </div>
                </main>
                <Footer>
                    <p className="text-muted d-inline-block">
                        Put "delete all data" link here
                    </p>
                </Footer>
            </div>
        );
    }
}

export default App;
