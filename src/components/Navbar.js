import React from "react";

function Navbar(props) {
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <a className="navbar-brand" href="/">
                    {props.appName}
                </a>
                {props.children}
            </div>
        </nav>
    );
}

export default Navbar;
