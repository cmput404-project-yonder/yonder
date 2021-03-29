// prompt user to confirm their sharing request
import React from "react";
import { Card, Container } from "react-bulma-components";
import { color, font } from "./styling";

import { SharingPostIcon } from "./postSVG";
import Dividor from "./Dividor";


import CancelButton from "./CancelButton";
import ConfirmButton from "./ConfirmButton";

import { cardStyle } from "../../../styling/StyleComponents";

var submittPanelStyle = {
    margin: "0.5em",
    marginBottom: "0em",
    marginTop: "1.2em",
    paddingRight: "1.5em",
    paddingLeft: "1.5em",
}



var buttonLayoutStyle = {
    display: "flex",
    width: "0em",
    float: "right",
    marginRight: "10em",       // the width of two button.
}

var postIconStyle = {
    scale: "70",
    style: {
      padding: "1em",
      fill: color.buttonGreen,
    }
}

var postCardDisplayStyle = {
    boxShadow: "0pt 0pt 3pt #B1B1B1",
    borderRadius: "8pt",
    marginLeft: "1em",
    marginRight: "1em",
    paddingTop: "1em",
    paddingBottom: "1em",
    paddingRight: "1em",
    paddingLeft: "1em",
    fontSize: "1.3em",
    backgroundColor: color.backgroundGrey,
}

var createPostHeaderStype = {
    display: "flex",
    padding: "0.5em",
}  

var dividorStyle = {
    marginTop: "1em",
    marginBottom: "0.6em",
}

var promptTitleStyle = {
    fontSize: "2.2em",
    fontWeight: "300",
    marginTop: "-62pt",
    marginLeft: "80pt",
    fontFamily: font.segoeUI,
    color: color.baseBlack,
    float: "left",
}

class SharingPostPromptCard extends React.Component {
    render() {

        const postContentDisplay = () => {
            switch (this.props.post.contentType) {
                case "text/plain":
                    return (<p>{this.props.post.title}</p>)
                case "text/markdown":
                    return (<p>{this.props.post.title}</p>)
                default:
                    // image
                    return (
                        <Container style={{textAlign: "center"}}>
                        <img style={{borderRadius: "6pt"}}src={`data:${this.props.post.contentType},${this.props.post.content}`} /> 
                        </Container>
                    )            
            }
        }


        const PostCard = () => {
            return (
                <Card style={postCardDisplayStyle}>
                    <p>{this.props.post.title}</p>
                    <Dividor style={dividorStyle}/>
                    {postContentDisplay()}
                    <Dividor style={dividorStyle}/>
                    <p>@{this.props.post.author.displayName}</p>
                </Card>
            )

        }

        const cancelButtonHandler = () => {
            // exit animation attemps, commented out for now.
            // dont know how to find .modal.is-active.modal-background
            // maybe ill give it another try in part3
            // --- Gengyuan
      
            // let formCard = document.getElementById("postFormCard");
            // formCard.addEventListener("animationend", () => {this.props.setModalIsOpen(false);})
            // formCard.className = 'animate__animated animate__fadeOutDown'
      
            this.props.setModalIsOpen(false);
        }

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
                <CancelButton action={cancelButtonHandler}/>
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

                <PostCard/>
                <PostSubmitPanel/>
            </Card>
        )
    }
}

export default SharingPostPromptCard;