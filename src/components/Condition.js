import React from "react";

// props:
// - type
// - value
const Condition = props => {
    return (
        <div className="col">
            <span className="d-block condition text-secondary">
                {props.type}
            </span>
            <span className="d-block">
                <strong>{props.value}</strong>
            </span>
        </div>
    );
};

export default Condition;
