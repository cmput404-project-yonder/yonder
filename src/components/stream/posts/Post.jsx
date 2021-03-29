import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bulma-components";
import EditPostForm from "./EditPostForm";
import SharingPostPrompt from "./SharingPostPrompt";

import { Card, Content, Container } from "react-bulma-components";
import Dividor from "./Dividor";
import { Link } from "react-router-dom";
import EditButton from "./EditButton";
import ShareButton from "./ShareButton";
import LikeButton from "./LikeButton";
import { dividorStyle, formContainerStyle, postStyle } from "./StyleComponents";
import { color } from "./styling";


var signatureStyle = {
  display: "flex",
  float: "right",
  gap: "4pt",
  color: color.baseLightGrey,
  marginRight: "0.5em",
}

var titleStyle = {
  fontSize: "1.2em",
  fontWeight: "400",
  marginLeft: "0.5em",
}

var ContentStyle = {
  marginLeft: "0.5em",
  marginRight: "0.5em",
}

var postContainerStyle = {
  padding: "0.8em",
}

function getDateString(ms) {
  let date = new Date(ms);
  return date.toLocaleDateString();
}

function Post(props) {
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [sharingPromptIsOpen, setSharingPromptIsOpen] = useState(false);
  // console.log(props.post);
  
  const postURL = "/author/" + props.post.author.id + "/posts/" + props.post.id;

  const IsImage = () => {
    if (props.post.contentType === "text/plain") {
      return false;
    }
    else if (props.post.contentType === "text/markdown") {
      return false;
    }
    else {
      return true;
    }
  }
  const isImage = IsImage();
  if (isImage) {
  }

  // console.log(isImage);

  return (
      <Card style={postStyle}>
        <Card.Content style={postContainerStyle}>

          {/* Title */}
          <Container style={signatureStyle}>
          <p style={{ fontWeight: "250" }}>@{props.post.author.displayName}</p>
          <p>·</p>
          <p>{getDateString(Date.parse(props.post.published))}</p>
          </Container>
          <Container style={titleStyle}>
          <Link to={`${postURL}`} style={{textDecoration: "none", color: color.baseBlack}}>{props.post.title}</Link>
          </Container>

          {/* Content */}
          <Container style = {ContentStyle}>
          <Dividor style={dividorStyle}/>
          {isImage ? (
            <Content>
              <img src={`data:${props.post.contentType},${props.post.content}`} /> 
            </Content>
          ) : <Content>{props.post.content}</Content> }
          </Container>

        </Card.Content>
        <Card.Footer style={{textAlign: "center", height: "28pt"}}>
          <Card.Footer.Item renderAs="a" onClick={{}}>
            <LikeButton/>
          </Card.Footer.Item>
          <Card.Footer.Item renderAs="a" onClick={() => setSharingPromptIsOpen(true)}>
            <ShareButton/>
          </Card.Footer.Item>
          <Card.Footer.Item renderAs="a" onClick={() => setEditModalIsOpen(true)}>
            <EditButton/>
          </Card.Footer.Item>
          <Modal show={editModalIsOpen} onClose={() => setEditModalIsOpen(false)} closeOnBlur closeOnEsc>
            <EditPostForm
              setEditModalIsOpen={setEditModalIsOpen}
              post={props.post}
              updatePost={props.updatePost}
              deletePost={props.deletePost}
            />
          </Modal>
          <Modal show={sharingPromptIsOpen} onClose={() => setSharingPromptIsOpen(false)} closeOnBlur closeOnEsc>
            <SharingPostPrompt
              setModalIsOpen={setSharingPromptIsOpen}   
              post={props.post}
              sharePost={props.sharePost}
            />
          </Modal>
        </Card.Footer>
      </Card>
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  updatePost: PropTypes.func.isRequired,
};

export default Post;
