import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Root from "./Root";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import Stream from "./components/stream/Stream";
import Profile from "./components/profile/Profile";
import SelectedPost from "./components/stream/posts/SelectedPost";
import 'animate.css';

import axios from "axios";
import Home from "./components/Home";
axios.defaults.baseURL= process.env.NODE_ENV === "production" ? "https://yonder.moe/api" : "http://localhost:8000/api";

class App extends Component {
  render() {
    return (
      <div>
        <Root>
          <ToastContainer hideProgressBar={true} newestOnTop={true} />
          <Switch>
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/stream" component={Stream} />
            <Route exact path="/author/:id" component={Profile} />
            <Route exact path="/author/:author_id/posts/:id" component={SelectedPost} />
            <Route exact path="/" component={Home} />
          </Switch>
        </Root>
      </div>
    );
  }
}

export default App;
