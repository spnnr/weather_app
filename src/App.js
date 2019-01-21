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
        tmpForecast: {
            // begin testing data
            // name: "Some City",
            // forecast: {
            //     currently: {
            //         time: 1547925491,
            //         summary: "Mostly Cloudy",
            //         icon: "partly-cloudy-day",
            //         nearestStormDistance: 7,
            //         nearestStormBearing: 14,
            //         precipIntensity: 0,
            //         precipProbability: 0,
            //         temperature: 58.43,
            //         apparentTemperature: 58.43,
            //         dewPoint: 51.93,
            //         humidity: 0.79,
            //         pressure: 1027.72,
            //         windSpeed: 0.22,
            //         windGust: 3.58,
            //         windBearing: 42,
            //         cloudCover: 0.77,
            //         uvIndex: 3,
            //         visibility: 10,
            //         ozone: 229.54
            //     },
            //     minutely: {
            //         summary: "Mostly cloudy for the hour.",
            //         icon: "partly-cloudy-day"
            //     },
            //     hourly: {
            //         summary: "Overcast throughout the day.",
            //         icon: "cloudy"
            //     },
            //     daily: {
            //         summary:
            //             "Light rain tomorrow, with high temperatures bottoming out at 57°F on Monday.",
            //         icon: "rain",
            //         data: [
            //             {
            //                 time: 1547884800,
            //                 summary: "Mostly cloudy throughout the day.",
            //                 icon: "partly-cloudy-day",
            //                 sunriseTime: 1547911410,
            //                 sunsetTime: 1547947176,
            //                 moonPhase: 0.45,
            //                 precipIntensity: 0.0004,
            //                 precipIntensityMax: 0.004,
            //                 precipIntensityMaxTime: 1547884800,
            //                 precipProbability: 0.58,
            //                 precipType: "rain",
            //                 temperatureHigh: 60.95,
            //                 temperatureHighTime: 1547938800,
            //                 temperatureLow: 56.39,
            //                 temperatureLowTime: 1548000000,
            //                 apparentTemperatureHigh: 60.95,
            //                 apparentTemperatureHighTime: 1547938800,
            //                 apparentTemperatureLow: 56.39,
            //                 apparentTemperatureLowTime: 1548000000,
            //                 dewPoint: 51.44,
            //                 humidity: 0.81,
            //                 pressure: 1026.3,
            //                 windSpeed: 1.21,
            //                 windGust: 7.64,
            //                 windGustTime: 1547967600,
            //                 windBearing: 156,
            //                 cloudCover: 0.92,
            //                 uvIndex: 3,
            //                 uvIndexTime: 1547928000,
            //                 visibility: 10,
            //                 ozone: 229.65,
            //                 temperatureMin: 54.27,
            //                 temperatureMinTime: 1547888400,
            //                 temperatureMax: 60.95,
            //                 temperatureMaxTime: 1547938800,
            //                 apparentTemperatureMin: 54.27,
            //                 apparentTemperatureMinTime: 1547888400,
            //                 apparentTemperatureMax: 60.95,
            //                 apparentTemperatureMaxTime: 1547938800
            //             },
            //             {
            //                 time: 1547971200,
            //                 summary:
            //                     "Mostly cloudy throughout the day and breezy starting in the afternoon.",
            //                 icon: "wind",
            //                 sunriseTime: 1547997781,
            //                 sunsetTime: 1548033641,
            //                 moonPhase: 0.49,
            //                 precipIntensity: 0.0147,
            //                 precipIntensityMax: 0.0302,
            //                 precipIntensityMaxTime: 1548007200,
            //                 precipProbability: 0.85,
            //                 precipType: "rain",
            //                 temperatureHigh: 56.6,
            //                 temperatureHighTime: 1548007200,
            //                 temperatureLow: 49.92,
            //                 temperatureLowTime: 1548079200,
            //                 apparentTemperatureHigh: 56.6,
            //                 apparentTemperatureHighTime: 1548007200,
            //                 apparentTemperatureLow: 43.55,
            //                 apparentTemperatureLowTime: 1548050400,
            //                 dewPoint: 51.31,
            //                 humidity: 0.88,
            //                 pressure: 1019.11,
            //                 windSpeed: 10.1,
            //                 windGust: 32.58,
            //                 windGustTime: 1548050400,
            //                 windBearing: 245,
            //                 cloudCover: 0.92,
            //                 uvIndex: 2,
            //                 uvIndexTime: 1548010800,
            //                 visibility: 8.08,
            //                 ozone: 296.35,
            //                 temperatureMin: 49.92,
            //                 temperatureMinTime: 1548046800,
            //                 temperatureMax: 57.34,
            //                 temperatureMaxTime: 1547985600,
            //                 apparentTemperatureMin: 43.55,
            //                 apparentTemperatureMinTime: 1548050400,
            //                 apparentTemperatureMax: 57.34,
            //                 apparentTemperatureMaxTime: 1547985600
            //             },
            //             {
            //                 time: 1548057600,
            //                 summary: "Partly cloudy in the morning.",
            //                 icon: "partly-cloudy-night",
            //                 sunriseTime: 1548084151,
            //                 sunsetTime: 1548120107,
            //                 moonPhase: 0.52,
            //                 precipIntensity: 0.0007,
            //                 precipIntensityMax: 0.0034,
            //                 precipIntensityMaxTime: 1548061200,
            //                 precipProbability: 0.27,
            //                 precipType: "rain",
            //                 temperatureHigh: 57.28,
            //                 temperatureHighTime: 1548111600,
            //                 temperatureLow: 47.7,
            //                 temperatureLowTime: 1548169200,
            //                 apparentTemperatureHigh: 57.28,
            //                 apparentTemperatureHighTime: 1548111600,
            //                 apparentTemperatureLow: 44.91,
            //                 apparentTemperatureLowTime: 1548169200,
            //                 dewPoint: 43.57,
            //                 humidity: 0.72,
            //                 pressure: 1024.26,
            //                 windSpeed: 11.27,
            //                 windGust: 29.18,
            //                 windGustTime: 1548057600,
            //                 windBearing: 316,
            //                 cloudCover: 0.17,
            //                 uvIndex: 3,
            //                 uvIndexTime: 1548100800,
            //                 visibility: 10,
            //                 ozone: 308.81,
            //                 temperatureMin: 49.92,
            //                 temperatureMinTime: 1548079200,
            //                 temperatureMax: 57.28,
            //                 temperatureMaxTime: 1548111600,
            //                 apparentTemperatureMin: 44.83,
            //                 apparentTemperatureMinTime: 1548079200,
            //                 apparentTemperatureMax: 57.28,
            //                 apparentTemperatureMaxTime: 1548111600
            //             }
            //         ]
            //     }
            // }
            // end testing data
        },
        locations: [],
        forecastList: [],
        units: "si",
        unitsOptions: ["Metric", "Imperial"],
        currentAction: ""
    };

    // TODO add ThemeSwitch (toggle light and dark mode) https://github.com/Heydon/react-theme-switch

    // handles error messages
    handleError(error) {
        console.log(error);
        this.setState({ error, currentAction: "" });
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
