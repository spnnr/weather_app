import React from "react";

// props:
// - type
// - onClick
// - icon
// - text

const DefaultButton = props => {
    let className = `btn btn-sm`,
        buttonText = "",
        iconType = "fas";

    if (!(props.type === undefined)) {
        className += " btn-" + props.type;
    } else {
        className += " btn-primary";
    }

    if (props.text !== undefined) {
        buttonText = " " + props.text;
    }
    if (props.icon !== undefined) {
        iconType += " " + props.icon;
    }

    return (
        <button className={className} onClick={props.onClick}>
            <i className={iconType} />
            {buttonText}
        </button>
    );
};

export default DefaultButton;
