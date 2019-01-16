import React from "react";

// components
import ForecastCard from "./ForecastCard";

const ForecastList = props => {
    if (props.forecastList.length === 0) {
        return null;
    }
    const forecastList = props.forecastList.map(location => {
        return (
            <ForecastCard
                key={location.id}
                locationId={location.id}
                forecast={location.forecast}
                location={location.name}
                buttonText={props.buttonText}
                buttonAction={props.buttonAction}
            />
        );
    });
    return <div className="col">{forecastList}</div>;
};
export default ForecastList;
