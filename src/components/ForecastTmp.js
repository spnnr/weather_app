import React from "react";

// components
import ForecastCard from "./ui/ForecastCard";

function isEmpty(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) return false;
    }
    return true;
}

const ForecastTmp = props => {
    if (isEmpty(props.location)) {
        return (
            <div className="col">
                <p>
                    Search for a city or geolocate to see forecast for your
                    current location
                </p>
            </div>
        );
    }
    return (
        <div className="col">
            <ForecastCard
                key={props.location.id}
                locationId={props.location.id}
                forecast={props.location.forecast}
                location={props.location.name}
                buttonText={props.buttonText}
                buttonAction={props.buttonAction}
                deleteCard={props.deleteCard}
                deleteButtonText="Clear"
                tmp
            />
        </div>
    );
};

export default ForecastTmp;
