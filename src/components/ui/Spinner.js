import React from "react";

const Spinner = props => {
    return (
        <div className="mx-auto my-4 text-center">
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <div className="d-block pb-4">
                <strong className="align-middle">{props.message}</strong>
            </div>
        </div>
    );
};

export default Spinner;
