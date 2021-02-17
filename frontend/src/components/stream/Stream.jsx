import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Container } from "react-bulma-components";
import { logout } from "../login/LoginActions";

class Stream extends Component {
  onLogout = () => {
    this.props.logout();
  };

  render() {
    const { author } = this.props.author;
    return (
      <div>
        <Container>
          <h1>Welcome to your stream {author.display_name}</h1>
        </Container>
      </div>
    );
  }
}

Stream.propTypes = {
  logout: PropTypes.func.isRequired,
  author: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  author: state.author
});

export default connect(mapStateToProps, {
  logout
})(withRouter(Stream));
