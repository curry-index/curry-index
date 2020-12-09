import React, { Component } from "react";
import './Nav.css';
import {
    NavLink,
    Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

class Nav extends Component {

    render() {
        return (
            <nav id="overrides" className="navbar mb-5 px-0">
                <Link to="/" className="navbar-brand">Custom Curry Index</Link>

                <div className="navbar-nav flex-row">
                    <NavLink to="/" className="nav-item nav-link px-1 mr-2">Curry Index</NavLink>

                    <NavLink to="/map" className="nav-item nav-link px-1 mx-2">Map</NavLink>
                </div>
            </nav>
        )
    }
}

export default Nav;