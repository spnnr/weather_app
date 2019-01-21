import React from "react";

// components
import OneDayForecast from "./OneDayForecast";

const DaysList = props => {
    const processedData = props.forecast.data.map((day, index) => {
        if (index === 0) return null;
        return (
            <OneDayForecast
                forecast={day}
                key={day.time}
                timezone={props.timezone}
            />
        );
    });
    return <div className="card-body border-bottom">{processedData}</div>;
};

export default DaysList;
