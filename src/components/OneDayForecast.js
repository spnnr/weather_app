import React from "react";

// utils
import { getHoursAndMinutes, getDayOfWeek } from "../utils/time";

const OneDayForecast = props => {
    const forecast = props.forecast;
    return (
        <div className="my-4 text-left">
            <a
                href={`#d${forecast.time}`}
                data-toggle="collapse"
                aria-expanded="false"
                aria-controls="collapseExample"
                className="d-block"
            >
                <div>
                    <span className="d-inline-block width-40">
                        {getDayOfWeek(forecast.time)}
                    </span>
                    <div className="d-inline-block width-20 text-center">
                        <span
                            className={`d-inline-block weather-icon-sm ${
                                forecast.icon
                            }`}
                        >
                            {forecast.icon}
                        </span>
                    </div>
                    <span className="d-inline-block width-20 text-right">
                        <strong>{Math.round(forecast.temperatureHigh)}</strong>
                    </span>
                    <span className="d-inline-block width-20 text-right">
                        {Math.round(forecast.temperatureLow)}
                    </span>
                </div>
            </a>
            <div className="collapse" id={`d${forecast.time}`}>
                <div className="text-secondary">{forecast.summary}</div>
                <div>
                    <span className="text-secondary">Sunrise</span>
                    <span className="float-right">
                        {getHoursAndMinutes(
                            forecast.sunriseTime,
                            props.timezone
                        )}
                    </span>
                </div>
                <div>
                    <span className="text-secondary">Sunset</span>
                    <span className="float-right">
                        {getHoursAndMinutes(
                            forecast.sunsetTime,
                            props.timezone
                        )}
                    </span>
                </div>
                <div>
                    <span className="text-secondary">
                        Chance of {forecast.precipType}
                    </span>{" "}
                    <span className="float-right">
                        {Math.round(forecast.precipProbability * 100)}%
                    </span>
                </div>
                <div>
                    <span className="text-secondary">Humidity</span>
                    <span className="float-right">
                        {Math.round(forecast.humidity * 100)}%
                    </span>
                </div>
                <div>
                    <span className="text-secondary">Cloud cover</span>
                    <span className="float-right">
                        {Math.round(forecast.cloudCover * 100)}%
                    </span>
                </div>
                <div>
                    <span className="text-secondary">UV index</span>
                    <span className="float-right">{forecast.uvIndex}</span>
                </div>
            </div>
        </div>
    );
};

export default OneDayForecast;

/*
time: 1547884800,
summary: "Mostly cloudy throughout the day.",
icon: "partly-cloudy-day",
sunriseTime: 1547911410,
sunsetTime: 1547947176,
moonPhase: 0.45,
precipIntensity: 0.0004,
precipIntensityMax: 0.004,
precipIntensityMaxTime: 1547884800,
precipProbability: 0.58,
precipType: "rain",
temperatureHigh: 60.95,
temperatureHighTime: 1547938800,
temperatureLow: 56.39,
temperatureLowTime: 1548000000,
apparentTemperatureHigh: 60.95,
apparentTemperatureHighTime: 1547938800,
apparentTemperatureLow: 56.39,
apparentTemperatureLowTime: 1548000000,
dewPoint: 51.44,
humidity: 0.81,
pressure: 1026.3,
windSpeed: 1.21,
windGust: 7.64,
windGustTime: 1547967600,
windBearing: 156,
cloudCover: 0.92,
uvIndex: 3,
uvIndexTime: 1547928000,
visibility: 10,
ozone: 229.65,
temperatureMin: 54.27,
temperatureMinTime: 1547888400,
temperatureMax: 60.95,
temperatureMaxTime: 1547938800,
apparentTemperatureMin: 54.27,
apparentTemperatureMinTime: 1547888400,
apparentTemperatureMax: 60.95,
apparentTemperatureMaxTime: 1547938800
 */
