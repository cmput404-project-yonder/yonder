import React from "react";
import PropTypes from "prop-types";
import { Card, Heading, Container } from "react-bulma-components";

import { cardStyle, dividorStyle, postStyle, signatureStyle } from "../../styling/StyleComponents";
import { color } from "../../styling/ColorFontConfig";

import Dividor from "../profile/Dividor";

var itemCardStyle = {
  padding: "1.2em",
  borderRadius: "6pt",
  boxShadow: "0pt 0pt 3pt rgb(0,0,0,0.1)",
  width: "98%",
  margin: "auto",
  marginTop: "2em",
  marginBottom: "2em",
}

var itemMsgStyle = {
  ...signatureStyle,
  float: "none",
  fontSize: "1.4em",
  color: color.baseBlack,
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

        <Dividor style={dividorStyle}/>

        {/* Post title */}
        <Container style={itemMsgStyle}>
          <p >{props.post.title}</p>
        </Container>
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
          <p>is now following you</p>
        </Container>
      </Card>
  );
}

export function Like(props) {
  return (
      <Card style={itemCardStyle}>
        {/* message */}
        <Container style={itemMsgStyle}>
          <p style={{ fontWeight: "250" }}>@{props.like.actor.displayName}</p>
          <p>·</p>
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
