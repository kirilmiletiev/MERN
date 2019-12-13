import React from 'react';
// import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

import Navbar from "./components/navbar";
import ItemsList from "./components/items-list";
import EditItem from "./components/edit-items";
import CreateItem from "./components/create-item";
import CreateUser from "./components/create-users";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={ItemsList} />
        <Route path="/edit/:id" component={EditItem} />
        <Route path="/create" component={CreateItem} />
        <Route path="/users" component={CreateUser} />
      </div>
    </Router>
  );
};

export default App;
