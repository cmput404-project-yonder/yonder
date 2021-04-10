import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Container, Button, Form, Section } from "react-bulma-components";

import { color } from "./styling";
import { signup } from "./SignupActions";
import YonderLogo from "../YonderLogo";
import SignupButton from "./SignupButton";

var loginCardStyle = {
  borderRadius: "8pt",
  width: "630pt",
  height: "340pt",
  marginTop: "150pt",
  boxShadow: "0pt 0pt 8pt rgb(0,0,0,0.5)",
  backgroundColor: color.backgroundCream,
}

var loginContentContainer = {
  display: "flex",
  padding: "1em",
  height: "100%",
}

var logoStyle = {
  textAlign: "center",
  margin: "auto",
  fontSize: "4em",
  color: color.baseBlack,
  width: "40%",
}

var loginFormStyle = {
  marginTop: "auto",
  marginBottom: "auto",
  paddingRight: "2em",
  width: "60%",
}
var formStyle = {
  width: "200pt",
  display: "flex",
  flexDirection: "column",
  gap: "5pt",
}

var loginButtonStyle = {
  float: "right",
  marginTop: "-60pt",
  marginRight: "18pt",
}

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
        <Container className="animate__animated animate__pulse animate_faster" style={loginCardStyle}>
          <Container style={loginContentContainer}>
            <Container style={logoStyle}>
              <YonderLogo svgScale="160"/>
              <p>Yonder</p>
            </Container>
            <Container style={loginFormStyle}>

              <Container style={formStyle}>
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

            </Container>
            <Container style={{float: "right", marginRight: "80pt", marginTop: "10pt", color: color.baseLightGrey}}>
            <p>Already have account? <Link to="/login">Login</Link></p>
            </Container>
            </Container>
          </Container>
          <Container style={loginButtonStyle}>
            <SignupButton onClick={this.onSignupClick}/>
          </Container>
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
