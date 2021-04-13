// prompt user to confirm their sharing request
import React from "react";
import { Card, Container } from "react-bulma-components";
import { color } from "./../../../styling/ColorFontConfig";

import { SharingPostIcon } from "./buttons/postSVG";

import ConfirmButton from "./buttons/ConfirmButton";

import { cardStyle } from "../../../styling/StyleComponents";

import Post from "./Post";


var submittPanelStyle = {
    margin: "0.5em",
    marginBottom: "0em",
    paddingRight: "1.5em",
    paddingLeft: "1.5em",
}


var buttonLayoutStyle = {
    display: "flex",
    width: "0em",
    float: "right",
    marginRight: "5em",       // the width of two button.
}

var postIconStyle = {
    scale: "70",
    style: {
      padding: "1em",
      fill: "#8EB9C2",
    }
}

var postCardDisplayStyle = {
    boxShadow: "0pt 0pt 3pt #B1B1B1",
    borderRadius: "8pt",
    fontSize: "1.3em",
    marginLeft: "1em",
    marginRight: "1em",
    marginBottom: "0.5em",
    marginTop: "0.1em",
    backgroundColor: color.backgroundGrey,
}

var createPostHeaderStype = {
    display: "flex",
    padding: "0.5em",
} 

var promptTitleStyle = {
    fontSize: "2.2em",
    fontWeight: "300",
    marginTop: "-60pt",
    marginLeft: "140pt",
    color: color.baseLightGrey,
    float: "left",
}

class SharingPostPromptCard extends React.Component {
    render() {

        const confirmButtonHandler = () => {
            // this function implement the sharing functionility

            // send the entire post to backend.
            this.props.sharePost(this.props.post);
            this.props.setModalIsOpen(false);
        }

        const PostSubmitPanel = () => {
            return (
              <Container style={submittPanelStyle}>        
                <PostFormButtonPanel/>
              </Container>
            )
        }


        const PostFormButtonPanel = () => {
            // Confirm and back button used to submit form
            return (
              <Container style={buttonLayoutStyle}>
                <ConfirmButton action={confirmButtonHandler}/>
              </Container>
            )
        }


        return (
            <Card style={cardStyle} className="animate__animated animate__slideInUp">
                <Container style={createPostHeaderStype}>
                    <Container style={postIconStyle.style}><SharingPostIcon svgScale={postIconStyle.scale}/></Container>
                </Container>
                <Container style={promptTitleStyle}><p>Sharing this post?</p></Container>                

                <Post interactive={false} post={this.props.post} style={postCardDisplayStyle}/>
                <PostSubmitPanel/>
            </Card>
        )
    }
}

export default SharingPostPromptCard;