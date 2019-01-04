import React from "react";

class BasicWeather extends React.Component {
    isEmpty(obj) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) return false;
        }
        return true;
    }

    render() {
        if (this.isEmpty(this.props.weather)) {
            return (
                <div className="col">
                    <p>
                        Detect your location or search for any city in the world
                        to see weather
                    </p>
                </div>
            );
        }

        const currently = this.props.weather.currently;

        return (
            <div className="col">
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
                                Precip probability:{" "}
                                {currently.precipProbability}
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
                        {/*<a href="#" class="btn btn-primary">Go somewhere</a>*/}
                    </div>
                </div>
                <p />
            </div>
        );
    }
}

export default BasicWeather;
