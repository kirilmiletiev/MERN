import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import isAuth from '../../../../server/utils/auth';
export default class Navbar extends Component {


    componentDidMount(){

    }
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">Home</Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">Items</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create" className="nav-link">Create Item Log</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/users" className="nav-link">Create User</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/users/login" className="nav-link">Login</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/users/register" className="nav-link">Register</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/users/logout" className="nav-link">Logout</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    };
};