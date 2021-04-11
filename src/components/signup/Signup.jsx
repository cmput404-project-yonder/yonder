import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Container, Button, Form, Section } from "react-bulma-components";
import { Redirect } from "react-router-dom";

import { color } from "../../styling/ColorFontConfig";
import { signup } from "./SignupActions";
import SignupButton from "./SignupButton";
import { LoginPageIcon } from "../../styling/svgIcons";
import { labelStyle } from "../../styling/StyleComponents.js";

var loginCardStyle = {
  borderRadius: "14pt",
  minwidth: "300pt",
  maxWidth: "360pt",
  marginTop: "-10pt",
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

            <Form.Field>
            <Form.Label style={labelStyle}>Display Name <span style={{color: color.baseRed}}>*</span></Form.Label>
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
            <Form.Label style={labelStyle}>Github URL</Form.Label>
              <Form.Control>
                <Form.Input
                  type="text"
                  name="githubURL"
                  placeholder="Github URL"
                  value={this.state.githubURL}
                  onChange={this.onChange}
                />
              </Form.Control>
            </Form.Field>

            </Container>
            <hr style={{...shadowDividorStyle, backgroundColor: "transparent", marginBottom: "0.5em", marginTop: "-12pt"}}></hr>
            <Container style={{fontSize: "1.15em", color: color.baseLightGrey, float: "left", paddingTop: "20pt", paddingLeft: "6pt", zIndex: "1"}}>
            <p>Already have account? <Link to="/login">Login</Link></p>
            </Container>
            <Container style={loginButtonStyle}>
            <SignupButton onClick={this.onSignupClick}/>
            </Container>
            </Container>
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
