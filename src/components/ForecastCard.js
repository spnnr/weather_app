import React from "react";

// components
import DefaultButton from "./ui/DefaultButton";
import DaysList from "./DaysList";
import Condition from "./Condition";

// css
import "../css/weather.css";

// utils
import { getHoursAndMinutes } from "../utils/time";

// props:
// - key
// - forecast
// - location
// - buttonText
// - buttonAction
// - locationId
// - deleteCard
// - deleteButtonText

// TODO add hourly forecast
// TODO add units

const ForecastCard = props => {
    const currently = props.forecast.currently;
    const minutely = props.forecast.minutely;
    const hourly = props.forecast.hourly;
    const daily = props.forecast.daily;
    const timezone = props.forecast.timezone;

    return (
        <div className="col-sm-10 col-md-8 col-lg-6">
            <div className="card text-center mb-4">
                {/* Current temperature */}
                <div className="card-body border-bottom">
                    <h3 className="card-title">{props.location}</h3>
                    <p className="text-secondary">
                        {minutely && (
                            <span>
                                {minutely.summary}
                                <br />
                            </span>
                        )}
                        {hourly.summary}
                    </p>
                    <div className="d-inline-block align-items-center">
                        <div className={`weather-icon ${currently.icon} m-2`}>
                            Icon
                        </div>
                        <h1>{Math.round(currently.temperature)}&deg;</h1>
                    </div>
                    <h6 className="text-secondary">
                        Feels like: {Math.round(currently.apparentTemperature)}
                        &deg;
                    </h6>
                </div>
                {/* Current conditions */}
                <div className="card-body border-bottom">
                    <div className="card-text row mb-4">
                        <Condition
                            type="Sunrise"
                            value={getHoursAndMinutes(
                                daily.data[0].sunriseTime,
                                timezone
                            )}
                        />
                        <Condition
                            type="Sunset"
                            value={getHoursAndMinutes(
                                daily.data[0].sunsetTime,
                                timezone
                            )}
                        />
                    </div>
                    <div className="card-text row mb-4">
                        <Condition
                            type={`Chance of ${daily.data[0].precipType}`}
                            value={`${Math.round(
                                currently.precipProbability * 100
                            )}%`}
                        />
                        <Condition
                            type="Humidity"
                            value={`${Math.round(currently.humidity * 100)}%`}
                        />
                    </div>
                    <div className="card-text row">
                        <Condition
                            type="Wind Speed"
                            value={Math.round(currently.windSpeed)}
                        />
                        <Condition
                            type="Wind Gust"
                            value={Math.round(currently.windGust)}
                        />
                    </div>
                </div>
                {/* 7-day forecast */}
                <DaysList forecast={daily} timezone={timezone} />
                {/* Buttons */}
                <div className="card-body">
                    {!props.tmp && (
                        <DefaultButton
                            type="danger"
                            onClick={e => {
                                e.preventDefault();
                                props.buttonAction(props.locationId);
                            }}
                            text={props.buttonText}
                            icon="fa-trash-alt"
                            outline
                        />
                    )}
                    {props.tmp && (
                        <div>
                            <DefaultButton
                                type="primary mx-1"
                                onClick={e => {
                                    e.preventDefault();
                                    props.buttonAction(props.locationId);
                                }}
                                text={props.buttonText}
                                icon="fa-bookmark"
                                outline
                            />
                            <DefaultButton
                                type="danger mx-1"
                                onClick={e => {
                                    e.preventDefault();
                                    props.deleteCard();
                                }}
                                text={props.deleteButtonText}
                                icon="fa-trash-alt"
                                outline
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForecastCard;
