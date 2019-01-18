import React from "react";

const Spinner = props => {
    return (
        <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <strong>{props.message}</strong>
        </div>
    );
};

export default Spinner;
