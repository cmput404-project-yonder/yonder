import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Container, Button, Columns, Form, Heading } from "react-bulma-components";

import { login } from "./LoginActions.js";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onLoginClick = () => {
    const userData = {
      username: this.state.username,
      password: this.state.password,
    };
    this.props.login(userData, "/dashboard");
  };
  render() {
    return (
      <Container fluid>
        <Columns>
          <Columns.Column size={4}>
            <Heading>Login</Heading>
            <Form.Field>
              <Form.Label>User name</Form.Label>
              <Form.Control>
                <Form.Input
                  type="text"
                  name="username"
                  placeholder="Enter user name"
                  value={this.state.username}
                  onChange={this.onChange}
                />
              </Form.Control>
            </Form.Field>

            <Form.Field>
              <Form.Label>Your password</Form.Label>
              <Form.Control>
                <Form.Input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </Form.Control>
            </Form.Field>
            <Button color="primary" onClick={this.onLoginClick}>
              Login
            </Button>
            <p className="mt-2">
              Don't have account? <Link to="/signup">Signup</Link>
            </p>
          </Columns.Column>
        </Columns>
      </Container>
    );
  }
}

//export default Login;
Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  login,
})(withRouter(Login));
