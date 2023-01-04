import React from 'react';
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    let location = useLocation();
    return (
        <nav id="total-nav" className="bg-dark">
            <Link id="nav-title" to="/"> iNotebook </Link>
            <ul id="navbar" className="bg-dark">
                <li> <Link className={`nav-item ${location.pathname === "/" ? "active" : ""}`} to="/">Home</Link> </li>
                <li> <Link className={`nav-item ${location.pathname === "/services" ? "active" : ""}`} to="/services">Services</Link> </li>
                <li> <Link className={`nav-item ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link> </li>
                <li> <Link className={`nav-item ${location.pathname === "/contact" ? "active" : ""}`} to="/contact">Contact</Link> </li>
            </ul>
        </nav>
    )
}

export default Navbar;