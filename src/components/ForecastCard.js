import React from "react";

// components
import DefaultButton from "./ui/DefaultButton";

// props:
// - key
// - forecast
// - location
// - buttonText
// - buttonAction
// - locationId

class ForecastCard extends React.Component {
    onUserAction = event => {
        event.preventDefault();
        this.props.buttonAction(this.props.locationId);
    };

    render() {
        const currently = this.props.forecast.currently;
        return (
            <div className="card text-center">
                <div className="card-body">
                    <h3 className="card-title">{this.props.location}</h3>
                    <p>{currently.summary}</p>
                    <h1>
                        {currently.temperature}&deg;/
                        <span className="text-secondary">
                            {currently.apparentTemperature}&deg;
                        </span>
                    </h1>
                    <div className="card-text row mt-4">
                        <div className="col">
                            Precip probability: {currently.precipProbability}
                            <br />
                            Humidity: {currently.humidity}
                            <br />
                            Pressure: {currently.pressure}
                            <br />
                            Visibility: {currently.visibility}
                            <br />
                        </div>
                        <div className="col">
                            Wind Speed: {currently.windSpeed}
                            <br />
                            Wind Gust: {currently.windGust}
                            <br />
                            UV index: {currently.uvIndex}
                            <br />
                            Icon: {currently.icon}
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <DefaultButton
                        type="primary"
                        onClick={this.onUserAction}
                        text={this.props.buttonText}
                        icon="fa-bookmark"
                    />
                </div>
            </div>
        );
    }
}

// props:
// - type
// - onClick
// - icon
// - text

export default ForecastCard;
