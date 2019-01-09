import React from "react";

const Alert = props => {
    if (props.errorMessage !== "") {
        return (
            <div className="alert alert-warning" role="alert">
                <h4 className="alert-heading">Ooops... ¯\_(ツ)_/¯</h4>
                <p>{props.errorMessage}</p>
                <hr />
                <p className="mb-0">Please try again later...</p>
            </div>
        );
    }
    return <div />;
};

export default Alert;
