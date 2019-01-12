import React from "react";

const Alert = props => {
    if (props.error) {
        return (
            <div className="row align-items-center mb-4 mt-4">
                <div className="alert alert-warning" role="alert">
                    <h4 className="alert-heading">Ooops... ¯\_(ツ)_/¯</h4>
                    <p>{props.error}</p>
                    <hr />
                    <p className="mb-0">Please try again later...</p>
                </div>
            </div>
        );
    }
    return null;
};

export default Alert;
