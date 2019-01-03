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
                <div>
                    <p>
                        Detect your location or search for any city in the world
                        to see weather
                    </p>
                </div>
            );
        }
        return (
            <div>
                <p>Showing weather for {this.props.location}</p>
                <p>{JSON.stringify(this.props.weather)}</p>
            </div>
        );
    }
}

export default BasicWeather;
