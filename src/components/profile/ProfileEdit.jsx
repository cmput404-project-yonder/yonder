/*
profile edit form

Properties:
    props.displayName - the current displayName of the author
    props.onCancel - cancel button's onClick event handler
*/

import React from "react";
import { Form, Container, Card } from "react-bulma-components";
import { ProfileIcon } from "./ProfileIcons";
import { color, font } from "./styling";

import CancelButton from "../stream/posts/CancelButton";
import ConfirmButton from "../stream/posts/ConfirmButton";
import Dividor from "./Dividor";
import { dividorStyle } from "../stream/posts/StyleComponents";


const formContainerStyle = {
  boxShadow: "0pt 0pt 3pt #B1B1B1",
  borderRadius: "8pt",
  marginLeft: "-1.2em",
  marginRight: "-1.2em",
  paddingTop: "1em",
  paddingBottom: "1em",
  paddingRight: "1.5em",
  paddingLeft: "1.5em",
  backgroundColor: color.backgroundGrey,
}


const formStyle = {
  overall: {
    paddingLeft: "1em",
    paddingRight: "1em",
    paddingTop: "2em",
    paddingBottom: "3em",
  },
  label: {
    paddingTop: "0.1em",
    paddingLeft: "0.5em",
    textAlign: "left",
    fontWeight: "400",
    color: color.baseLightGrey,
    }
};

const headingStyle = {
  overall: {
    paddingTop: "1.5em",
    paddingBottom: "0.5em",
    textAlign: "center",
  },
  title: {
    fontSize: "2.5em",
    fontWeight: "300",
    fontFamily: font.segoeUI,
    color: color.baseBlack,
  },
  logo: {
    scale: "85",
    style: {
      padding: "0.5em",
      fill: color.baseBlack,
    },
  },
};

const submittPanelStyle = {
  margin: "0.5em",
  marginBottom: "0em",
  marginTop: "0em",
  paddingRight: "1.5em",
  paddingLeft: "1.5em",
}
const buttonLayoutStyle = {
  display: "flex",
  width: "0em",
  marginRight: "10em",       // the width of two button.
}
var editProfileStyle = {
  borderRadius: "8pt",
  width: "400pt",
  height: "auto",
  boxShadow: "0pt 0pt 12pt #AAAAAA",
  backgroundColor: color.backgroundCream,
}



class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);

    // states
    this.state = {
      displayName: this.props.displayName,
      githubURL: this.props.githubURL,
      password: '',
    };
  }

  onChange = (evt) => {
    // https://couds.github.io/react-bulma-components/?path=/story/form--handle-multiple-inputs
    const value = evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    this.setState({
      [evt.target.name]: value,
    });
  };

  confirmEdit = () => {
    // not complete
    // missing password, currently, api doest support it
    const newProfile = {
      displayName: this.state.displayName,
      github: this.state.githubURL,
    }
    this.props.editProfile(newProfile);
    this.props.onCancel();
  }

  render() {
    const PostFormButtonPanel = () => {
      // Confirm and back button used to submit form
      return (
        <Container style={buttonLayoutStyle}>
          <CancelButton action={this.props.onCancel}/>
          <ConfirmButton action={this.confirmEdit}/>
        </Container>
      )
    }
    const PostSubmitPanel = () => {
      return (
        <Container style={submittPanelStyle}>
          <PostFormButtonPanel/>
        </Container>
      )
    }


    const { displayName, password, githubURL } = this.state;
    return (
      <Card style={editProfileStyle} className="animate__animated animate__slideInUp">
        <Container style={headingStyle.overall}>
          <div style={headingStyle.logo.style}>
            <ProfileIcon svgScale={headingStyle.logo.scale} />
          </div>
        </Container>
        <Container style={formContainerStyle}>
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
          <Form.Field>
            <Form.Label style={formStyle.label}>Password</Form.Label>
            <Form.Control>
                <Form.Input 
                    name="password" 
                    onChange={this.onChange} 
                    value={password} type="password" 
                    placeholder="Enter your new password"
                ></Form.Input>
            </Form.Control>
        </Form.Field>
        <Dividor style={dividorStyle}/>
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
        </Container>
        <PostSubmitPanel/>
      </Card>
    );
  }
}

export default ProfileEdit;
