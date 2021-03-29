import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Container, Button, Form, Heading, Section } from "react-bulma-components";
import { Redirect } from "react-router-dom";
import { login } from "./LoginActions.js";
import { color } from "./styling";

import LoginButton from "./LoginButton";
import YonderLogo from "../YonderLogo";

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
    if (this.props.auth.isAuthenticated) {
      return <Redirect to="/stream" />;
    } else return (
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
            
            </Container>
            <Container style={{float: "right", marginRight: "80pt", marginTop: "10pt", color: color.baseLightGrey}}>
            <p>Don't have account? <Link to="/signup">Signup</Link></p>
            </Container>
            </Container>
          </Container>
          <Container style={loginButtonStyle}>
            <LoginButton onClick={this.onLoginClick}/>
          </Container>
        </Container>
      </Section>
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
