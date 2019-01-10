import React from "react";

const Footer = props => {
    return (
        <footer className="footer">
            <div className="container">{props.children}</div>
        </footer>
    );
};

export default Footer;
