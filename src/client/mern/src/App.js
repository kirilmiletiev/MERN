import React from 'react';
// import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import ItemsList from "./components/items-list";
import EditItem from "./components/edit-items";
import CreateItem from "./components/create-item";
//import CreateUser from "./components/create-users";
//import Logout from "./components/logout";

import Register from "./components/User/Register"
import Logout from '../../mern/src/components/User/Logout';
import Login from './components/User/Login';
import Navigation from './components/Navigation'

function App() {
  return (
    <Router>
      <div className="container">
        <Navigation component={Navigation} />
        <br />
        <Route path="/" exact component={ItemsList} />
        <Route path="/edit/:id" component={EditItem} />
        <Route path="/add-item" component={CreateItem} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/logout" component={(Logout)} />
        <Route exact path="/login" component={(Login)} />
      </div>
    </Router>
  );
};

export default App;
