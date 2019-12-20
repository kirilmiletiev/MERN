import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'
import './style.css';
import authService from '../../auth/index';

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isLogged: "" }
        this.render.bind(this);
    }
    componentDidMount = () => {
        this.setState = { isLogged: authService.getUserInfo() }
    }

    componentDidUpdate = () => {
        this.setState('isLogged', authService.getUserInfo())
    }

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg" >
                <Link to="/" className="navbar-brand">Home</Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">Items</Link>
                        </li>
                        {(!authService.getUserInfo()) ?
                            <Fragment>
                                <li className="navbar-item">
                                    <Link to="/login" className="nav-link">Login</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/register" className="nav-link">Register</Link>
                                </li>
                            </Fragment>
                            :
                            <Fragment>
                                <li className="navbar-item">
                                    <Link to="/profile" className="nav-link">Hello {authService.getUserInfo().username}</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/add-item" className="nav-link">Add Item</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/test" className="nav-link">test</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/logout" className="nav-link">Logout</Link>
                                </li>
                            </Fragment>
                        }
                    </ul>
                </div>
            </nav>
        )
    };
}
export default Navigation;