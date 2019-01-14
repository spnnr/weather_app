import React from "react";
import axios from "axios";

// components
import WeatherCard from "./WeatherCard";

class WeatherList extends React.Component {
    state = { forecastList: [] };

    // builds forecast list with weather forecast for each location
    async requestWeather(locations) {
        if (locations.length === 0) {
            return;
        }
        let forecastList = [];
        for (let i = 0; i < locations.length; i++) {
            try {
                const response = await axios.get("/weather", {
                    params: {
                        lat: locations[i].lat,
                        lng: locations[i].lng
                    }
                });
                const forecast = { ...locations[i], forecast: response.data };
                forecastList.push(forecast);
            } catch (error) {
                this.props.handleError(error);
                return;
            }
        }
        this.setState({ forecastList });
    }

    // only called once when a component is mounted after being born
    componentDidMount() {
        this.requestWeather(this.props.locations);
    }

    // called everytime when component is passed new props
    // DO NOT CALL setState() IN componentDidUpdate(), YOU WILL GET AN INFINITE LOOP
    componentWillReceiveProps(nextProps) {
        console.log(nextProps.locations);
        this.requestWeather(nextProps.locations);
    }

    render() {
        if (this.state.forecastList.length === 0) {
            return null;
        }
        const weatherList = this.state.forecastList.map(location => {
            return (
                <WeatherCard
                    key={location.id}
                    forecast={location.forecast}
                    location={location.name}
                />
            );
        });
        return <span>{weatherList}</span>;
    }
}

export default WeatherList;
