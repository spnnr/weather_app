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

    if (props.type) {
        if (props.outline) {
            className += " btn-outline-";
        } else {
            className += " btn-";
        }
        className += props.type;
    } else {
        className += " btn-primary";
    }

    if (props.text) {
        if (props.icon) {
            buttonText += " " + props.text;
        } else {
            buttonText = props.text;
        }
    }
    if (props.icon) {
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
