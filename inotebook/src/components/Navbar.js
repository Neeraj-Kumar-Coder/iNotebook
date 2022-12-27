import React from 'react';
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    return (
        <nav className="bg-dark">
            <ul id="navbar" className="bg-dark">
                <li> <Link className="nav-item" to="/">Home</Link> </li>
                <li> <Link className="nav-item" to="/about">About</Link> </li>
            </ul>
        </nav>
    )
}

export default Navbar;