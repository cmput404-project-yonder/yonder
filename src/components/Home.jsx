import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Home extends Component {
  render() {
    if (this.props.auth.isAuthenticated) {
      return <Redirect to="/stream" />;
    } else {
      return <Redirect to="/login"/>;
    }
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(withRouter(Home));
