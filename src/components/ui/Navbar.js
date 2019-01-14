import React from "react";

function Navbar(props) {
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">{props.children}</div>
        </nav>
    );
}

export default Navbar;
