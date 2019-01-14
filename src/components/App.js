import React, { Component } from "react";
import axios from "axios";

// components
import WeatherList from "./WeatherList";
import DefaultButton from "./ui/DefaultButton";
import Navbar from "./ui/Navbar";
import Search from "./ui/Search";
import Alert from "./ui/Alert";
import Footer from "./ui/Footer";

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

    // handles location lookup from search field
    onSearchSubmit = async term => {
        let response = await axios.get("/geocode", {
            params: { address: term }
        });
        if (response.data.hasOwnProperty("error")) {
            this.handleError(response.data.error);
            return;
        }

        this.setState(
            { locations: [...this.state.locations, response.data] },
            () => {
                this.requestWeather();
            }
        );
        console.log(this.state);
    };

    // isEmpty(obj) {
    //     for (let key in obj) {
    //         if (obj.hasOwnProperty(key)) return false;
    //     }
    //     return true;
    // }

    // onLocationRequest = () => {
    //     this.setState({ status: "loading" });
    //     window.navigator.geolocation.getCurrentPosition(
    //         async position => {
    //             let lat = position.coords.latitude.toFixed(7),
    //                 lng = position.coords.longitude.toFixed(7);
    //             let response = await axios.get("/geocode", {
    //                 params: {
    //                     latlng: `${lat},${lng}`
    //                 }
    //             });
    //             if (response.data.hasOwnProperty("error")) {
    //                 this.setState({ ...response.data, status: "error" });
    //                 return;
    //             }
    //             this.setState(response.data, () => {
    //                 this.requestWeather();
    //             });
    //         },
    //         error => {
    //             let result = {
    //                 lat: null,
    //                 lng: null,
    //                 location: "",
    //                 error,
    //                 status: "error"
    //             };
    //             this.setState(result);
    //         }
    //     );
    // };

    // console.log("BW props:", this.props);

    // if (this.isEmpty(this.props.weather) && !this.props.status) {
    //     return (
    //         <div className="col">
    //             <p>
    //                 Detect your location or search for any city in the world
    //                 to see weather
    //             </p>
    //         </div>
    //     );
    // }

    // if (this.props.status === "loading") {
    //     return (
    //         <div className="col text-center">
    //             <Spinner />
    //         </div>
    //     );
    // }

    // if (this.props.status === "error") {
    //     return <div />;
    // }

    render() {
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
                        // {onClick={this.onLocationRequest}}
                        icon="fa-map-marker-alt"
                        btnType="secondary"
                    />
                </Navbar>
                <main className="container">
                    <Alert error={this.state.error} />
                    <div className="row align-items-center mb-4 mt-4">
                        <WeatherList
                            forecastList={this.state.forecastList}
                            handleError={this.handleError}
                        />
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
