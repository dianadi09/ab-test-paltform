import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

export default class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-light bg-light navbar-expand-lg">
                <Link to="/" className="navbar-brand">AB Test Platform</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/tests/" className="nav-link">Tests</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/history/" className="nav-link">History</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/configs" className="nav-link">Configs</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/users" className="nav-link">Users</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}