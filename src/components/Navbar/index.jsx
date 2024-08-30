import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg py-2 navbar-dark bg-primary">
      <Link to="/" className="navbar-brand ms-5">
        Voice Controlled Website
      </Link>

      <ul className="navbar-nav ms-auto me-5">
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
        <li className="nav-item ms-5">
          <Link
            to={{ pathname: '/search', state: { text: '' } }}
            className="btn btn-light btn-sm mt-1">
            <i className="fa fa-search"></i> Search
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
