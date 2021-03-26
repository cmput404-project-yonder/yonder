import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bulma-components";
import EditPostForm from "./EditPostForm";
import SharingPostPrompt from "./SharingPostPrompt";

import { Card, Content, Heading } from "react-bulma-components";
import { font, color } from "./styling";
import Dividor from "./Dividor";

import EditButton from "./EditButton";
import ShareButton from "./ShareButton";
import LikeButton from "./LikeButton";

var dividorStyle = {
  marginTop: "1em",
  marginBottom: "0.6em",
}

var postStyle = {
  boxShadow: "0pt 0pt 8pt rgb(0,0,0,0.5)",
  borderRadius: "6pt",
  backgroundColor: color.backgroundCreamLighter,
  marginBottom: "3em",
  marginTop: "0.5em",
  fontFamily: font.segoeUI,
  fontWeight: "350",
  fontSize: "1.3em",
  color: color.baseBlack,
  minHeight: "25em",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}



function Post(props) {
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [sharingPromptIsOpen, setSharingPromptIsOpen] = useState(false);
  console.log(props.post);
  return (
      <Card style={postStyle}>
        <Card.Header>
          <Card.Header.Title style={{ marginLeft: "1em" }}>
              <p style={{ fontWeight: "250" }}>@{props.post.author.displayName}</p>
          </Card.Header.Title>
        </Card.Header>
        <Card.Content>
          <Heading size={8}>{props.post.title}</Heading>
          <Dividor style={dividorStyle}/>
          <Content>{props.post.content}</Content>
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
              updatePost={props.updatePost}
              deletePost={props.deletePost}
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
