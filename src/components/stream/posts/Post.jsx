import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bulma-components";
import EditPostForm from "./EditPostForm";
import SharingPostPrompt from "./SharingPostPrompt";

import { Card, Content, Heading } from "react-bulma-components";
import { font, color } from "./styling";
import Dividor from "./Dividor";
import { Link } from "react-router-dom";
import EditButton from "./EditButton";
import ShareButton from "./ShareButton";
import LikeButton from "./LikeButton";
import { dividorStyle, postStyle, textStyle, authorStyle, contentStyle } from "./StyleComponents";

function Post(props) {
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [sharingPromptIsOpen, setSharingPromptIsOpen] = useState(false);
  console.log(props.post);
  
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

  // console.log(isImage);

  return (
      <Card style={postStyle}>
        <Card.Header>
          <Card.Header.Title style={{ marginLeft: "1em" }}>
              <p style={{ fontWeight: "250" }}>@{props.post.author.displayName}</p>
          </Card.Header.Title>
        </Card.Header>
        <Card.Content>
          <Heading size={8}>
            <Link to={`${postURL}`}>{props.post.title}</Link>
          </Heading>
          <Dividor style={dividorStyle}/>
          {isImage ? (
            <Content>
              <img src={`data:${props.post.contentType},${props.post.content}`} /> 
            </Content>
          ) : <Content>{props.post.content}</Content> }
          <Dividor style={dividorStyle}/>
          <p style={{ margin: "1em", fontSize: "0.7em" }}>{props.post.published}</p>
        </Card.Content>
        <Card.Footer>
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
