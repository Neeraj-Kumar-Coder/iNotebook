import React from 'react';
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    let location = useLocation();
    return (
        <nav className="bg-dark">
            <ul id="navbar" className="bg-dark">
                <li> <Link className={`nav-item ${location.pathname === "/" ? "active" : ""}`} to="/">Home</Link> </li>
                <li> <Link className={`nav-item ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link> </li>
            </ul>
        </nav>
    )
}

export default Navbar;