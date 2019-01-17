import React, { Component } from "react";
import axios from "axios";

// components
import ForecastList from "./ForecastList";
import ForecastTmp from "./ForecastTmp";
import DefaultButton from "./ui/DefaultButton";
import Navbar from "./ui/Navbar";
import Search from "./ui/Search";
import Alert from "./ui/Alert";
import Footer from "./ui/Footer";
import Spinner from "./ui/Spinner";
import Modal from "./ui/Modal";
import InputSelect from "./ui/InputSelect";

// css
import "../css/main.css";

// App
class App extends Component {
    state = {
        error: "",
        tmpLocation: {},
        tmpForecast: {},
        locations: [],
        forecastList: [],
        units: "si",
        unitsOptions: ["Metric", "Imperial"]
    };

    // TODO change the looks of it
    // TODO refresh weather automatically every 30 minutes

    // handles error messages
    handleError(error) {
        console.log(error);
        this.setState({ error });
    }

    // checks for empty object
    isEmpty(obj) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) return false;
        }
        return true;
    }

    // handles unit selection
    onUnitsChange = input => {
        // console.log(input);
        let units = input === "metric" ? "si" : "us";
        this.setState({ units }, () => {
            this.refreshWeather();
        });
    };

    // handles search field request from the user
    onLocationSearchSubmit = async term => {
        this.setState({ error: "" });
        let response = await axios.get("/geocode", {
            params: { address: term }
        });

        this.addTmpLocation(response.data);
    };

    // handles geolocation request from the user
    onGeolocationRequest = () => {
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
                this.addTmpLocation(response.data);
            },
            error => {
                this.handleError(error);
            }
        );
    };

    // handles user's request to save location
    onSaveLocation = () => {
        const locations = this.state.locations.filter(location => {
            return location.id !== this.state.tmpLocation.id;
        });
        const forecastList = this.state.forecastList.filter(location => {
            return location.id !== this.state.tmpLocation.id;
        });
        this.setState({
            locations: [this.state.tmpLocation, ...locations],
            forecastList: [this.state.tmpForecast, ...forecastList],
            tmpForecast: {},
            tmpLocation: {}
        });
    };

    // handles user's request to delete location
    onDeleteLocation = id => {
        const locations = this.state.locations.filter(location => {
            return location.id !== id;
        });
        const forecastList = this.state.forecastList.filter(location => {
            return location.id !== id;
        });
        this.setState({ locations, forecastList });
    };

    // saves a recent search as a temporary location and requests weather
    async addTmpLocation(tmpLocation) {
        if (tmpLocation.hasOwnProperty("error")) {
            this.handleError(tmpLocation.error);
            return;
        }
        const tmpForecast = await this.requestWeather(tmpLocation);
        this.setState({ tmpLocation, tmpForecast });
    }

    // requests weather for a single location and returns it
    async requestWeather(location) {
        let forecast = {};
        try {
            const response = await axios.get("/weather", {
                params: {
                    lat: location.lat,
                    lng: location.lng,
                    units: this.state.units
                }
            });
            if (response.data.hasOwnProperty("error")) {
                this.handleError(response.data.error);
                return;
            }
            forecast = {
                ...location,
                forecast: response.data
            };
        } catch (error) {
            this.handleError(error);
            return;
        }
        return forecast;
    }

    // refreshes all weather, including tmpLocation
    refreshWeather = async () => {
        let tmpForecast = {};
        let forecastList = [];
        if (!this.isEmpty(this.state.tmpLocation)) {
            tmpForecast = await this.requestWeather(this.state.tmpLocation);
        }
        if (this.state.locations.length > 0) {
            for (const location of this.state.locations) {
                const forecast = await this.requestWeather(location);
                forecastList.push(forecast);
            }
        }
        this.setState({ tmpForecast, forecastList });
    };

    // loads locations from localStorage
    getStateFromLocalStorage() {
        // get units
        let units = "si";
        let unitsOptions = ["Metric", "Imperial"];
        if (localStorage.hasOwnProperty("units")) {
            units = localStorage.getItem("units");
        }
        // set the order of units in the units selector
        if (units === "us") {
            unitsOptions = ["Imperial", "Metric"];
        }
        // get stored locations and set state
        if (localStorage.hasOwnProperty("locations")) {
            let locations = localStorage.getItem("locations");
            try {
                locations = JSON.parse(locations);
                this.setState({ locations, units, unitsOptions }, () => {
                    this.refreshWeather();
                });
            } catch (error) {
                // handles empty array
                this.setState(locations, units, unitsOptions);
            }
        }
    }

    // saves locations in localStorage
    saveStateToLocalStorage() {
        localStorage.setItem("locations", JSON.stringify(this.state.locations));
        localStorage.setItem("units", this.state.units);
    }

    // delete all data from localStorage and clear state
    clearAllData = () => {
        this.setState({
            tmpLocation: {},
            tmpForecast: {},
            locations: [],
            error: "",
            forecastList: [],
            units: "si",
            unitsOptions: ["Metric", "Imperial"]
        });
        localStorage.clear();
    };

    componentDidMount() {
        if (localStorage) {
            this.getStateFromLocalStorage();
        }
        window.addEventListener(
            "beforeunload",
            this.saveStateToLocalStorage.bind(this)
        );
    }

    // cleaning up before component unmounts
    componentWillUnmount() {
        window.removeEventListener(
            "beforeunload",
            this.saveStateToLocalStorage.bind(this)
        );
        this.saveStateToLocalStorage();
    }

    render() {
        // console.log("App state", this.state);
        let tmpForecast = (
            <div className="col">
                <p>
                    Search for a city or geolocate to see forecast for your
                    current location
                </p>
            </div>
        );
        let content = null;

        // show while loading weather for stored locations
        if (
            this.state.locations.length > 0 &&
            this.state.forecastList.length < this.state.locations.length
        ) {
            content = <Spinner />;
        }

        // show forecast for stored locations
        if (
            this.state.locations.length > 0 &&
            this.state.forecastList.length > 0 &&
            this.state.locations.length === this.state.forecastList.length
        ) {
            content = (
                <ForecastList
                    forecastList={this.state.forecastList}
                    buttonAction={this.onDeleteLocation}
                    buttonText="Delete"
                />
            );
        }

        // show forecast for temporary location
        if (!this.isEmpty(this.state.tmpForecast)) {
            tmpForecast = (
                <ForecastTmp
                    location={this.state.tmpForecast}
                    buttonAction={this.onSaveLocation}
                    buttonText="Save"
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
                        onSubmit={this.onLocationSearchSubmit}
                        placeholder="Find location..."
                    />
                    <DefaultButton
                        onClick={this.onGeolocationRequest}
                        icon="fa-map-marker-alt"
                        type="secondary"
                    />
                    <InputSelect
                        inputTitle="Units"
                        inputOptions={this.state.unitsOptions}
                        onChange={this.onUnitsChange}
                    />
                    <DefaultButton
                        onClick={this.refreshWeather}
                        icon="fa-redo"
                        type="secondary"
                    />
                </Navbar>
                <main className="container">
                    <Alert error={this.state.error} />
                    <div className="row align-items-center mb-4 mt-4">
                        {tmpForecast}
                        <hr />
                        {content}
                    </div>
                </main>
                <Footer>
                    <span className="text-muted d-inline-block">
                        <Modal
                            type="danger"
                            modalTitle="Clear All Data"
                            modalMessage="Are you sure you want to reset the state of the
                            application?"
                            btnText="Clear all data"
                            btnAction={this.clearAllData}
                            btnIcon="fa-times"
                        />
                    </span>
                </Footer>
            </div>
        );
    }
}

export default App;

// { key: 1, name: "Moscow", lat: 55.755825, lng: 37.617298 },
// { key: 2, name: "Vancouver", lat: 49.28273, lng: -123.120735 }
