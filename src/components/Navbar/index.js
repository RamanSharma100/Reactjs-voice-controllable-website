import React from "react";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg py-2 navbar-dark bg-primary">
      <Link to="/" className="navbar-brand ml-5">
        Voice Controlled Website
      </Link>

      <ul className="navbar-nav ml-auto mr-5">
        <li className="nav-item">
          <NavLink exact to="/" className="nav-link">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/videos" className="nav-link">
            Videos
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/about" className="nav-link">
            About
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/contact" className="nav-link">
            Contact
          </NavLink>
        </li>
        <li className="nav-item ml-5">
          <Link to="/search" className="btn btn-outline-light btn-sm mt-1">
            <i className="fa fa-search"></i> Search
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
