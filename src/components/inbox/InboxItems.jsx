import React from "react";
import PropTypes from "prop-types";
import { Card, Heading, Container } from "react-bulma-components";

import { cardStyle, dividorStyle, postStyle, signatureStyle } from "../../styling/StyleComponents";
import { color } from "../../styling/ColorFontConfig";

import Dividor from "../stream/posts/Dividor";

var itemCardStyle = {
  marginLeft: "0.6em",
  marginRight: "0.6em",
  marginBottom: "0.9em", 
  marginTop: "0.2em",
  boxShadow: "0pt 0pt 6pt rgb(0,0,0,0.1)",
  borderRadius: "8pt",


  backgroundColor: "#D17878",
  width: "97%",
  padding: "0.3em"
}

var itemMsgStyle = {
  padding: "0.2em",
  paddingLeft: "0.5em",
  paddingRight: "0.5em",
  overflowWrap: "break-word",
  gap: "4pt",
  color: "white",
  fontSize: "1.2em",
  fontWeight: "400",
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
  console.log(props.post);
  return (
    <Card style={itemCardStyle}>
      {/* message */}
      <p style={{...itemMsgStyle, float: "right"}}>made a new post</p>
      <p style={itemMsgStyle}>@{props.post.author.displayName}</p>
      <hr style={{...shadowDividorStyle, backgroundColor: "transparent", marginBottom: "2pt", marginTop: "-34pt"}}></hr>
      <p style={itemMsgStyle}>Author ID: {props.post.author.id}</p>
      <p style={itemMsgStyle}>Author Host: {props.post.author.host} </p>
      <p style={itemMsgStyle}>Post ID: {props.post.id} </p>
    </Card>
  );
}

export function Follow(props) {
  
  return (
      <Card style={itemCardStyle}>
        {/* message */}
        <p style={{...itemMsgStyle, float: "right"}}>is now following you</p>
        <p style={itemMsgStyle}>@{props.follower.displayName}</p>
        <hr style={{...shadowDividorStyle, backgroundColor: "transparent", marginBottom: "2pt", marginTop: "-34pt"}}></hr>
        <p style={itemMsgStyle}>Author ID: {props.follower.id}</p>
        <p style={itemMsgStyle}>Author Host: {props.follower.host} </p>

      </Card>
  );
}

export function Like(props) {
  if (props.like.object.split("comments").length === 1) {
    return (
        <Card style={itemCardStyle}>
          {/* message */}
          <p style={{...itemMsgStyle, float: "right"}}>liked your post</p>
          <p style={itemMsgStyle}>@{props.like.author.displayName}</p>
          
          <hr style={{...shadowDividorStyle, backgroundColor: "transparent", marginBottom: "2pt", marginTop: "-34pt"}}></hr>
          <p style={itemMsgStyle}>Author ID: {props.like.author.id}</p>
          <p style={itemMsgStyle}>Author Host: {props.like.author.host}</p>
          <p style={itemMsgStyle}>Post ID: {props.like.object.split("posts")[1].split("/")[1]} </p>
        </Card>
    );
  } else {
    return (
      <Card style={itemCardStyle}>
        {/* message */}
        <p style={{...itemMsgStyle, float: "right"}}>liked your comment</p>
        <p style={itemMsgStyle}>@{props.like.author.displayName}</p>
        
        <hr style={{...shadowDividorStyle, backgroundColor: "transparent", marginBottom: "2pt", marginTop: "-34pt"}}></hr>
        <p style={itemMsgStyle}>Author ID: {props.like.author.id}</p>
        <p style={itemMsgStyle}>Author Host: {props.like.author.host}</p>
        <p style={itemMsgStyle}>Post ID: {props.like.object.split("comments")[0].split("posts")[1].split("/")[1]} </p>
      </Card>
  );
  }
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
