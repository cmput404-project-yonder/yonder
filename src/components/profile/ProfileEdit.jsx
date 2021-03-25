/*
profile edit form

Properties:
    props.displayName - the current displayName of the author
    props.onCancel - cancel button's onClick event handler
*/

import React from "react";
import Divider from "./Divider";
import { Button, Form, Container } from "react-bulma-components";
import { YonderLogo } from "./ProfileViewSVG";
import { style, color } from "./styling";
import { formStyle, headingStyle } from "../stream/posts/StyleComponents";

// local styling
var buttonStyleGeneric = style.button.style.generic;
var buttonsLayout = style.button.layout.horizontalBetween;

class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);

    // states
    this.state = {
      displayName: this.props.author.displayName,
      githubURL: this.props.author.github,
    };
  }

  onChange = (evt) => {
    // https://couds.github.io/react-bulma-components/?path=/story/form--handle-multiple-inputs
    const value = evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    this.setState({
      [evt.target.name]: value,
    });
  };

  render() {
    const { displayName, password, githubURL } = this.state;
    return (
      <Container>
        <Container style={headingStyle.overall}>
          <div style={headingStyle.logo.style}>
            <YonderLogo svgScale={headingStyle.logo.scale} />
          </div>
          <Container style={headingStyle.title}>
            <p>Edit your profile</p>
          </Container>
        </Container>
        <Divider />
        <Container style={formStyle.overall}>
          <Form.Field>
            <Form.Label style={formStyle.label}>Display Name</Form.Label>
            <Form.Control>
              <Form.Input
                name="displayName"
                onChange={this.onChange}
                value={displayName}
                type="text"
                placeholder={this.props.displayName}
              ></Form.Input>
            </Form.Control>
          </Form.Field>
          <Divider />
          <Form.Field>
            <Form.Label style={formStyle.label}>Github URL</Form.Label>
            <Form.Control>
              <Form.Input
                name="githubURL"
                onChange={this.onChange}
                value={githubURL}
                type="url"
                placeholder="Enter your github URL"
              ></Form.Input>
            </Form.Control>
          </Form.Field>
        </Container>
        <Divider />
        <Container style={buttonsLayout}>
          <Button onClick={this.props.onCancel} style={buttonStyleGeneric}>
            Cancel
          </Button>
          <Button style={buttonStyleGeneric}>Confirm</Button>
        </Container>
      </Container>
    );
  }
}

export default ProfileEdit;
