import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Container, Button, Columns, Form, Heading, Section } from "react-bulma-components";

import { signup } from "./SignupActions";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      displayName: "",
      githubURL: "",
    };
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSignupClick = () => {
    const userData = {
      username: this.state.username,
      password: this.state.password,
      displayName: this.state.displayName,
      github: this.state.githubURL,
    };
    this.props.signup(userData);
  };

  render() {
    return (
      <Section>
        <Container fluid>
          <Heading>Sign up</Heading>
          <div className="signup-form">
            <Form.Field>
              <Form.Control>
                <Form.Input
                  type="text"
                  name="username"
                  placeholder="User name"
                  value={this.state.username}
                  onChange={this.onChange}
                />
              </Form.Control>
            </Form.Field>

            <Form.Field>
              <Form.Control>
                <Form.Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </Form.Control>
            </Form.Field>

            <Form.Field>
              <Form.Control>
                <Form.Input
                  type="text"
                  name="displayName"
                  placeholder="Display Name"
                  value={this.state.displayName}
                  onChange={this.onChange}
                />
              </Form.Control>
            </Form.Field>

            <Form.Field>
              <Form.Control>
                <Form.Input
                  type="text"
                  name="githubURL"
                  placeholder="Github URL (optional)"
                  value={this.state.githubURL}
                  onChange={this.onChange}
                />
              </Form.Control>
            </Form.Field>

            <Button color="primary" onClick={this.onSignupClick}>
              Sign up
            </Button>
            <p className="mt-2">
              Already have account? <Link to="/login">Login</Link>
            </p>
          </div>
        </Container>
      </Section>
    );
  }
}

Signup.propTypes = {
  signup: PropTypes.func.isRequired,
  createUser: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  createUser: state.createUser,
});

export default connect(mapStateToProps, {
  signup,
})(withRouter(Signup));
