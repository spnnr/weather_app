import React from "react";

// components
import DefaultButton from "./DefaultButton";

// css
import "../../css/weather.css";

// props:
// - key
// - forecast
// - location
// - buttonText
// - buttonAction
// - locationId

// TODO add date and day of the week
// TODO add units
// TODO add images
// TODO reformat data display

const ForecastCard = props => {
    const currently = props.forecast.currently;
    return (
        <div className="col-sm-10 col-md-8 col-lg-6">
            <div className="card text-center mb-4">
                <div className="card-body border-bottom">
                    <h3 className="card-title">{props.location}</h3>
                    <p className="text-secondary">{currently.summary}</p>
                    <div className="d-inline-block align-items-center">
                        <div className={`weather-icon ${currently.icon} m-2`}>
                            Icon: {currently.icon}
                        </div>
                        <h1>{currently.temperature}&deg;</h1>
                    </div>
                    <h5 className="text-secondary">
                        Feels like: {currently.apparentTemperature}&deg;
                    </h5>
                </div>
                <div className="card-body border-bottom">
                    <div className="card-text row">
                        <div className="col">
                            <div>
                                <span className="d-block">Chance of rain</span>
                                <span className="d-block">
                                    {currently.precipProbability}
                                </span>
                            </div>
                            <div>
                                <span className="d-block">Humidity</span>
                                <span className="d-block">
                                    {currently.humidity}
                                </span>
                            </div>
                        </div>
                        <div className="col">
                            <div>
                                <span className="d-block">Wind Speed</span>
                                <span className="d-block">
                                    {currently.windSpeed}
                                </span>
                            </div>
                            <div>
                                <span className="d-block">Wind Gust</span>
                                <span className="d-block">
                                    {currently.windGust}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
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

// props:
// - type
// - onClick
// - icon
// - text

export default ForecastCard;
