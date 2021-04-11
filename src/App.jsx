import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import 'animate.css';
import "bulma-pageloader/dist/css/bulma-pageloader.min.css";

import Root from "./Root";
import Page from "./utils/Page";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import Stream from "./components/stream/Stream";
import Profile from "./components/profile/Profile";
import SelectedPost from "./components/stream/posts/SelectedPost";
import Home from "./components/Home";
import NavigationBar from "./components/NavigationBar";

axios.defaults.baseURL= process.env.NODE_ENV === "production" ? "https://yonder.moe/api" : "http://localhost:8000/api";

class App extends Component {
  render() {
    return (
      <div>
        <Root>
          <ToastContainer hideProgressBar={true} newestOnTop={true} />
          <NavigationBar/>
          <Switch>
            <div style={{paddingTop: "8em"}}>
            <Page path="/signup" component={Signup} title="Signup"/>
            <Page path="/login" component={Login} title="Login"/>
            <Page path="/stream" component={Stream} title="Stream"/>
            <Page exact path="/author/:id" component={Profile} title="Profile"/>
            <Page exact path="/author/:author_id/posts/:id" component={SelectedPost} title="View Post"/>
            <Page exact path="/" component={Home} />
            </div>
          </Switch>
        </Root>
      </div>
    );
  }
}

export default App;
