import React from "react";

// components
import DefaultButton from "./ui/DefaultButton";
import DaysList from "./DaysList";

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

// TODO reformat and refactor
// TODO add units
// TODO add hourly forecast

const ForecastCard = props => {
    const currently = props.forecast.currently;
    const minutely = props.forecast.minutely;
    const hourly = props.forecast.hourly;
    const daily = props.forecast.daily;
    const timezone = props.forecast.timezone;

    return (
        <div className="col-sm-10 col-md-8 col-lg-6">
            <div className="card text-center mb-4">
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
                <div className="card-body border-bottom">
                    <div className="card-text row">
                        <div className="col">
                            <div className="mb-4">
                                <span className="d-block condition text-secondary">
                                    Sunrise
                                </span>
                                <span className="d-block">
                                    <strong>
                                        {getHoursAndMinutes(
                                            daily.data[0].sunriseTime,
                                            timezone
                                        )}
                                    </strong>
                                </span>
                            </div>
                            <div className="mb-4">
                                <span className="d-block condition text-secondary">
                                    Chance of {daily.data[0].precipType}
                                </span>
                                <span className="d-block">
                                    <strong>
                                        {Math.round(
                                            currently.precipProbability * 100
                                        )}
                                        %
                                    </strong>
                                </span>
                            </div>
                            <div className="mb-4">
                                <span className="d-block condition text-secondary">
                                    Wind Speed
                                </span>
                                <span className="d-block">
                                    <strong>
                                        {Math.round(currently.windSpeed)}
                                    </strong>
                                </span>
                            </div>
                        </div>
                        <div className="col">
                            <div className="mb-4">
                                <span className="d-block condition text-secondary">
                                    Sunset
                                </span>
                                <span className="d-block">
                                    <strong>
                                        {getHoursAndMinutes(
                                            daily.data[0].sunsetTime,
                                            timezone
                                        )}
                                    </strong>
                                </span>
                            </div>
                            <div className="mb-4">
                                <span className="d-block condition text-secondary">
                                    Humidity
                                </span>
                                <span className="d-block">
                                    <strong>
                                        {Math.round(currently.humidity * 100)}%
                                    </strong>
                                </span>
                            </div>
                            <div>
                                <span className="d-block condition text-secondary">
                                    Wind Gust
                                </span>
                                <span className="d-block">
                                    <strong>
                                        {Math.round(currently.windGust)}
                                    </strong>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <DaysList forecast={daily} timezone={timezone} />
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
                            />
                            <DefaultButton
                                type="danger mx-1"
                                onClick={e => {
                                    e.preventDefault();
                                    props.deleteCard();
                                }}
                                text={props.deleteButtonText}
                                icon="fa-trash-alt"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForecastCard;
