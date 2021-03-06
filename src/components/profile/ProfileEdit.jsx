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
import { connect } from "react-redux";

import CancelButton from "../stream/posts/buttons/CancelButton";
import ConfirmButton from "../stream/posts/buttons/ConfirmButton";
import Dividor from "./Dividor";
import { dividorStyle, cardStyle, labelStyle } from "../../styling/StyleComponents";
import { toast } from "react-toastify";

const formContainerStyle = {
  borderRadius: "8pt",
  marginLeft: "1.2em",
  marginRight: "1.2em",
  paddingTop: "0em",
  paddingBottom: "0em",
  paddingRight: "0.5em",
  paddingLeft: "0.5em",
  backgroundColor: "white",
  boxShadow: "0pt 0pt 6pt rgb(0,0,0,0.1)",
}


const formStyle = {
  overall: {
    paddingLeft: "1em",
    paddingRight: "1em",
    paddingTop: "1em",
    paddingBottom: "2em",
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
    paddingBottom: "1em",
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
  marginRight: "5em",       // the width of two button.
}



class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);

    // states
    this.state = {
      displayName: this.props.displayName,
      githubURL: this.props.githubURL,
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
    const newProfile = {
      displayName: this.state.displayName,
      github: this.state.githubURL,
    }

    if (newProfile.displayName === "") {
      toast.error("Display Name cannot be empty");
    }
    else if 
      (
        (newProfile.github !== "")&&
        (
          (newProfile.github.replace("https://github.com/","") === newProfile.github)||
          (newProfile.github.replace("https://github.com/","")==="")
        )
      ) {
      toast.error("Github url invalid");
    }
    else {
      this.props.editProfile(newProfile);
      this.props.onCancel();
    }
  }

  render() {
    const PostFormButtonPanel = () => {
      // Confirm and back button used to submit form
      return (
        <Container style={buttonLayoutStyle}>
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

    const keypressHandler = (e) => {
      // press enter to submitt
      if (e.charCode === 13) {
        e.preventDefault();
        this.confirmEdit();
      }
    }

    const { displayName, githubURL } = this.state;
    return (
      
      <Card style={{...cardStyle, width: "360pt", borderRadius: "12pt"}} className="animate__animated animate__slideInUp">
        <Container style={headingStyle.overall}>
          <div style={headingStyle.logo.style}>
            <ProfileIcon svgScale={headingStyle.logo.scale} />
          </div>
        </Container>
        <Container style={formContainerStyle}>
        <Container style={formStyle.overall}>
          <Form.Field>
            <Form.Label style={labelStyle}>Display Name <span style={{color: color.baseRed}}>*</span></Form.Label>
            <Form.Control>
              <Form.Input
                name="displayName"
                onChange={this.onChange}
                value={displayName}
                type="text"
                placeholder={this.props.displayName}
                onKeyPress={keypressHandler}
              ></Form.Input>
            </Form.Control>
          </Form.Field>
          <Form.Field>
            <Form.Label style={labelStyle}>Github URL</Form.Label>
            <Form.Control>
              <Form.Input
                name="githubURL"
                onChange={this.onChange}
                value={githubURL}
                type="url"
                placeholder="Enter your github URL"
                onKeyPress={keypressHandler}
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