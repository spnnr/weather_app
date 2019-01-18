import React from "react";

function Navbar(props) {
    return (
        <nav className="navbar navbar-expand navbar-light bg-light">
            <div className="container">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    {props.children}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
