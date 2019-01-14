import React from "react";

const DefaultButton = props => {
    let className = "btn",
        buttonText = "",
        iconType = "fas";

    if (!(props.btnType === undefined)) {
        className += " btn-" + props.btnType;
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
