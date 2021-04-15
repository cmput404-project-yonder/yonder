import React from "react";
import PropTypes from "prop-types";
import { Card, Heading, Container } from "react-bulma-components";

import { cardStyle, dividorStyle, postStyle, signatureStyle } from "../../styling/StyleComponents";
import { color } from "../../styling/ColorFontConfig";

import Dividor from "../stream/posts/Dividor";

var itemCardStyle = {
  padding: "1.1em",
  paddingBottom: "1.5em",
  borderRadius: "6pt",
  // boxShadow: "0pt 0pt 3pt rgb(0,0,0,0.2)",
  boxShadow: "none",
  backgroundColor: "#E47171",
  width: "97%",
  margin: "auto",
  marginTop: "0em",
  marginBottom: "0.8em",
  // border: "solid",
  // borderColor: color.baseLightGrey,
  borderWidth: "1pt",
}

var itemMsgStyle = {
  display: "flex",
  justifyContent: "flex-start",
  gap: "4pt",
  color: "white",
  fontSize: "1.7em",
}

var shadowDividorStyle = {
  border:"none",
  width: "105%",
  height: "50px",
  boxShadow:"0 10pt 10pt -15pt rgb(0,0,0,0.3)",
  margin: "-40pt auto -15pt",
  marginLeft: "-1em",
  backgroundColor: color.backgroundCreamLighter,
}

export function Post(props) {
  return (
    <Card style={itemCardStyle}>

        {/* message */}
        <Container style={itemMsgStyle}>
          <p style={{ fontWeight: "250" }}>@{props.post.author.displayName}</p>
          <p>·</p>
          <p>made a new post</p>
        </Container>

        {/* <Dividor style={{marginTop: "2.2em", marginBottom: "2em"}}/>

        <Container style={itemMsgStyle}>
          <p >{props.post.title}</p>
        </Container> */}
    </Card>
  );
}

export function Follow(props) {
  return (
      <Card style={itemCardStyle}>
        {/* message */}
        <Container style={itemMsgStyle}>
          <p style={{ fontWeight: "250" }}>@{props.follower.displayName}</p>
          <p>·</p>
          <p>followed you</p>
        </Container>
      </Card>
  );
}

export function Like(props) {
  return (
      <Card style={itemCardStyle}>
        {/* message */}
        <Container style={itemMsgStyle}>
          <p style={{ fontWeight: "250" }}>@{props.like.author.displayName}</p>
          
          <hr style={{...shadowDividorStyle, backgroundColor: "transparent", marginBottom: "0.5em", marginTop: "-32pt"}}></hr>
          <p>liked your post</p>
        </Container>
      </Card>
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
};
Follow.propTypes = {
  follower: PropTypes.object.isRequired,
};
Like.propTypes = {
  like: PropTypes.object.isRequired,
};
