import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Root from "./Root";
import Home from "./components/Home";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import Stream from "./components/stream/Stream";
import Profile from "./components/profile/Profile";
import NavigationBar from "./components/NavigationBar";
import 'animate.css';

import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000/api";

class App extends Component {
  render() {
    return (
      <div>
        <Root>
          <NavigationBar />
          <ToastContainer hideProgressBar={true} newestOnTop={true} />
          <Switch>
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/stream" component={Stream} />
            <Route path="/author/:id" component={Profile} />
            <Route exact path="/" component={Home} />
          </Switch>
        </Root>
      </div>
    );
  }
}

export default App;
