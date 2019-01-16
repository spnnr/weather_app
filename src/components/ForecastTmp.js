import React from "react";

// components
import ForecastCard from "./ForecastCard";

function isEmpty(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) return false;
    }
    return true;
}

const ForecastTmp = props => {
    if (isEmpty(props.location)) {
        return null;
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
            />
        </div>
    );
};

export default ForecastTmp;
