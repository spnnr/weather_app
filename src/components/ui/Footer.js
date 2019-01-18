import React from "react";

const Footer = props => {
    return (
        <footer className="footer text-center py-2">
            <div className="container text-center">{props.children}</div>
        </footer>
    );
};

export default Footer;
