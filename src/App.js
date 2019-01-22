import React, { Component } from "react";
import axios from "axios";

// components
import ForecastList from "./components/ForecastList";
import ForecastTmp from "./components/ForecastTmp";
// ui components
import DefaultButton from "./components/ui/DefaultButton";
import Navbar from "./components/ui/Navbar";
import Alert from "./components/ui/Alert";
import Footer from "./components/ui/Footer";
import Spinner from "./components/ui/Spinner";
import Modal from "./components/ui/Modal";
import InputSelect from "./components/ui/InputSelect";

// css
import "./css/main.css";

// utils
import { isEmpty } from "./utils/other";

// App
class App extends Component {
    state = {
        error: "",
        tmpLocation: {},
        tmpForecast: {},
        locations: [],
        forecastList: [],
        units: "si",
        unitsOptions: ["Metric", "Imperial"],
        currentAction: ""
    };

    // TODO add ThemeSwitch (toggle light and dark mode) https://github.com/Heydon/react-theme-switch

    // handles error messages
    handleError(error) {
        let message = "";
        if (error.message) {
            message = error.message;
        } else {
            message = error;
        }
        this.setState({ error: message, currentAction: "" });
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
        this.setState({ error: "", currentAction: "searching..." });
        let response = await axios.get("/api/geocode", {
            params: { address: term }
        });

        this.addTmpLocation(response.data);
    };

    // handles geolocation request from the user
    onGeolocationRequest = () => {
        this.setState({ error: "", currentAction: "searching..." });
        window.navigator.geolocation.getCurrentPosition(
            async position => {
                let lat = position.coords.latitude.toFixed(7),
                    lng = position.coords.longitude.toFixed(7);
                let response = await axios.get("/api/geocode", {
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
        this.setState(
            {
                locations: [this.state.tmpLocation, ...locations],
                forecastList: [this.state.tmpForecast, ...forecastList],
                tmpForecast: {},
                tmpLocation: {}
            },
            () => {
                this.saveStateToLocalStorage();
            }
        );
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
        this.setState({ tmpLocation, tmpForecast, currentAction: "" });
    }

    // clears temporary search on user request
    clearTmp = () => {
        this.setState({ tmpLocation: {}, tmpForecast: {} });
    };

    // requests weather for a single location and returns it
    async requestWeather(location) {
        let forecast = {};
        try {
            const response = await axios.get("/api/weather", {
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
        this.setState({ currentAction: "updating..." });
        let tmpForecast = {};
        let forecastList = [];
        if (!isEmpty(this.state.tmpLocation)) {
            tmpForecast = await this.requestWeather(this.state.tmpLocation);
        }
        if (this.state.locations.length > 0) {
            for (const location of this.state.locations) {
                const forecast = await this.requestWeather(location);
                forecastList.push(forecast);
            }
        }
        this.setState({ tmpForecast, forecastList, currentAction: "" });
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
            unitsOptions: ["Metric", "Imperial"],
            currentAction: ""
        });
        localStorage.clear();
    };

    // show Spinner if processing user request
    showForecastTmp() {
        if (this.state.currentAction === "searching...") {
            return <Spinner message={this.state.currentAction} />;
        }
        if (
            this.state.currentAction === "updating..." &&
            !isEmpty(this.state.tmpForecast)
        ) {
            return null;
        }
        return (
            <ForecastTmp
                location={this.state.tmpForecast}
                buttonAction={this.onSaveLocation}
                buttonText="Save"
                deleteCard={this.clearTmp}
            />
        );
    }

    showForecastList() {
        if (this.state.currentAction === "updating...") {
            return <Spinner message={this.state.currentAction} />;
        }
        return (
            <ForecastList
                forecastList={this.state.forecastList}
                buttonAction={this.onDeleteLocation}
                buttonText="Delete"
            />
        );
    }

    // FIXME uncomment when done

    componentDidMount() {
        if (localStorage) {
            this.getStateFromLocalStorage();
        }
    }

    // cleaning up before component unmounts
    componentWillUnmount() {
        this.saveStateToLocalStorage();
    }

    render() {
        // console.log("App state", this.state);
        return (
            <div>
                <Navbar onLocationSearchSubmit={this.onLocationSearchSubmit}>
                    <div className="navbar-nav ml-auto controls">
                        <div className="d-inline-flex flex-nowrap mx-auto my-2">
                            <DefaultButton
                                onClick={this.onGeolocationRequest}
                                icon="fa-map-marker-alt"
                                type="secondary mr-2"
                            />
                            <InputSelect
                                inputTitle="Units"
                                inputOptions={this.state.unitsOptions}
                                onChange={this.onUnitsChange}
                            />
                            <DefaultButton
                                onClick={this.refreshWeather}
                                icon="fa-redo"
                                type="secondary ml-2"
                            />
                        </div>
                    </div>
                </Navbar>
                <main className="container">
                    <Alert error={this.state.error} />
                    {this.showForecastTmp()}
                    {this.showForecastList()}
                </main>
                <Footer>
                    <span className="text-muted align-items-center">
                        <Modal
                            type="danger"
                            modalTitle="Clear All Data"
                            modalMessage="Are you sure you want to delete all location data and reset the application?"
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
