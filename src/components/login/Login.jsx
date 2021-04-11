import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Container, Button, Form, Heading, Section } from "react-bulma-components";
import { Redirect } from "react-router-dom";
import { login } from "./LoginActions.js";
import { color } from "../../styling/ColorFontConfig";

import LoginButton from "./LoginButton";
import { LoginPageIcon } from "../../styling/svgIcons";
import { labelStyle } from "../../styling/StyleComponents.js";


var loginCardStyle = {
  borderRadius: "14pt",
  minwidth: "300pt",
  maxWidth: "360pt",
  marginTop: "28pt",
  boxShadow: "0pt 0pt 8pt rgb(0,0,0,0.5)",
  backgroundColor: color.backgroundCream,
}
var shadowDividorStyle = {
  border:"none",
  width: "110%",
  height: "50px",
  boxShadow:"0 10pt 10pt -15pt rgb(0,0,0,0.3)",
  margin: "-40pt auto -15pt",
  marginLeft: "-1.6em",
  backgroundColor: color.backgroundCreamLighter,
}

var loginContentContainer = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  padding: "0em",
  
}

var logoStyle = {
  fontSize: "3.6em",
  textAlign: "center",
  paddingTop: "1em",
  color: color.baseLightGrey,
  fill: color.baseLightGrey,
}

var loginFormStyle = {
  padding: "1em",
  marginLeft: "1.2em",
  marginRight: "1.2em",
  marginTop: "2em",
  marginBottom: "1.2em",
  boxShadow: "0pt 0pt 6pt rgb(0,0,0,0.1)",
  borderRadius: "10pt",
  backgroundColor: "white",
}
var formStyle = {
}

var loginButtonStyle = {
  textAlign: "Right",
  paddingTop: "1em",
  paddingBottom: "0em",
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
    this.props.login(userData, "/");
  };
  render() {
    if (this.props.auth.isAuthenticated) {
      return <Redirect to="/stream" />
    } else return (
      <Section>
        <Container className="animate__animated animate__fadeInUp animate_faster" style={loginCardStyle}>
          <Container style={loginContentContainer}>
            <Container style={logoStyle}>
            <LoginPageIcon svgScale="150"/>
            <p style={{marginTop: "-0.3em"}}>Yonder</p>
            </Container>
            <Container style={loginFormStyle}>

            <Container style={formStyle}>
            <Form.Field>
            <Form.Label style={labelStyle}>Username <span style={{color: color.baseRed}}>*</span></Form.Label>
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
            <Form.Label style={labelStyle}>Password <span style={{color: color.baseRed}}>*</span></Form.Label>
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
            <hr style={{...shadowDividorStyle, backgroundColor: "transparent", marginBottom: "0.5em", marginTop: "-12pt"}}></hr>
            <Container style={{fontSize: "1.15em", color: color.baseLightGrey, float: "left", paddingTop: "20pt", paddingLeft: "6pt", zIndex: "1"}}>
            <p>Don't have account? <Link to="/signup">Signup</Link></p>
            </Container>
            <Container style={loginButtonStyle}>
              <LoginButton onClick={this.onLoginClick}/>
            </Container>
            </Container>
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
