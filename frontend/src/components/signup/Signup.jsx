import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Container, Button, Columns, Form, Heading } from "react-bulma-components";

import { signupNewUser } from "./SignupActions";

class Signup extends Component {
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

  onSignupClick = () => {
    const userData = {
      username: this.state.username,
      password: this.state.password,
    };
    this.props.signupNewUser(userData);
  };

  render() {
    return (
      <Container fluid>
        <Columns>
          <Columns.Column size={4}>
            <Heading>Sign up</Heading>
            <Form.Field>
              <Form.Field>
                <Form.Label>User name</Form.Label>
                <Form.Control>
                  <Form.Input
                    isInvalid={this.props.createUser.usernameError}
                    type="text"
                    name="username"
                    placeholder="Enter user name"
                    value={this.state.username}
                    onChange={this.onChange}
                  />
                </Form.Control>
                <Form.Help color="danger">
                  {this.props.createUser.usernameError}
                </Form.Help>
              </Form.Field>

              <Form.Field>
                <Form.Label>Your password</Form.Label>
                <Form.Control>
                  <Form.Input
                    isInvalid={this.props.createUser.passwordError}
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={this.password}
                    onChange={this.onChange}
                  />
                </Form.Control>
                <Form.Help color="danger">
                  {this.props.createUser.passwordError}
                </Form.Help>
              </Form.Field>
            </Form.Field>
            <Button color="primary" onClick={this.onSignupClick}>
              Sign up
            </Button>
            <p className="mt-2">
              Already have account? <Link to="/login">Login</Link>
            </p>
          </Columns.Column>
        </Columns>
      </Container>
    );
  }
}

Signup.propTypes = {
  signupNewUser: PropTypes.func.isRequired,
  createUser: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  createUser: state.createUser,
});

export default connect(mapStateToProps, {
  signupNewUser,
})(withRouter(Signup));
