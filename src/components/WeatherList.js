import React from "react";

// components
import WeatherCard from "./WeatherCard";

const WeatherList = props => {
    if (props.forecastList.length === 0) {
        return null;
    }
    const weatherList = props.forecastList.map(location => {
        return (
            <WeatherCard
                key={location.id}
                forecast={location.forecast}
                location={location.name}
            />
        );
    });
    return <span>{weatherList}</span>;
};
export default WeatherList;
