import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import isAuth from '../../../../server/utils/auth';
//let isInLocalStorage = localStorage.getItem('username');
export default class Navbar extends Component {


    componentDidMount() {
       // console.log(isInLocalStorage);
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
                            <Link to="/login" className="nav-link">Login</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/register" className="nav-link">Register</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create" className="nav-link">Create Item Log</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">My Profile</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/logout" className="nav-link">Logout</Link>
                        </li>
                    </ul>
                </div>
            </nav>
    
        )
    }
    // render() {
    //     if (isInLocalStorage    ) {
    //         return (
    //             <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
    //                 <Link to="/" className="navbar-brand">Home</Link>
    //                 <div className="collpase navbar-collapse">
    //                     <ul className="navbar-nav mr-auto">
    //                         <li className="navbar-item">
    //                             <Link to="/" className="nav-link">Items</Link>
    //                         </li>
    //                         <li className="navbar-item">
    //                             <Link to="/create" className="nav-link">Create Item Log</Link>
    //                         </li>
    //                         <li className="navbar-item">
    //                             <Link to="/" className="nav-link">My Profile</Link>
    //                         </li>
    //                         <li className="navbar-item">
    //                             <Link to="/logout" className="nav-link">Logout</Link>
    //                         </li>
    //                     </ul>
    //                 </div>
    //             </nav>
    //         );
    //     } else {
    //         return (
    //             <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
    //                 <Link to="/" className="navbar-brand">Home</Link>
    //                 <div className="collpase navbar-collapse">
    //                     <ul className="navbar-nav mr-auto">
    //                         <li className="navbar-item">
    //                             <Link to="/" className="nav-link">Items</Link>
    //                         </li>

    //                         <li className="navbar-item">
    //                             <Link to="/users/login" className="nav-link">Login</Link>
    //                         </li>
    //                         <li className="navbar-item">
    //                             <Link to="/users/register" className="nav-link">Register</Link>
    //                         </li>
    //                     </ul>
    //                 </div>
    //             </nav>
    //         );
    //     }

    // };
};