import React from "react";

const WeatherCard = props => {
    const currently = props.forecast.currently;
    return (
        <div className="col">
            <div className="card text-center">
                <div className="card-body">
                    <h3 className="card-title">{props.location}</h3>
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
            </div>
            <p />
        </div>
    );
};

export default WeatherCard;
