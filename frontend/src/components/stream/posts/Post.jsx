import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bulma-components";
import EditPostForm from "./EditPostForm";

import { Card, Content, Media, Heading } from "react-bulma-components";

function Post(props) {
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  console.log(props.post);
  return (
    <div className="post">
      <Card>
        <Card.Header>
          <Card.Header.Title>{props.post.title}</Card.Header.Title>
            <Card.Footer.Item renderAs="a" onClick={() => setEditModalIsOpen(true)}>
              <span className="typcn typcn-edit"></span>
            </Card.Footer.Item>
            <Modal show={editModalIsOpen} onClose={() => setEditModalIsOpen(false)} closeOnBlur closeOnEsc>
              <EditPostForm setEditModalIsOpen={setEditModalIsOpen} post={props.post} updatePost={props.updatePost} deletePost={props.deletePost}/>
            </Modal>
        </Card.Header>
        <Card.Content>
          <Media>
            <Media.Item>
              <Heading size={6} style={{ marginBottom: "-0.5em" }}>
                @{props.post.author.display_name}
              </Heading>
            </Media.Item>
          </Media>
          <Content>{props.post.content}</Content>
          <p style={{ margin: "-1em 0", fontSize: "0.8em" }}>{props.post.published}</p>
        </Card.Content>
        <Card.Footer>
          <Card.Footer.Item renderAs="a">
            <span className="typcn typcn-heart-outline" />
          </Card.Footer.Item>
          <Card.Footer.Item renderAs="a">
            <span className="typcn typcn-arrow-loop" />
          </Card.Footer.Item>
        </Card.Footer>
      </Card>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  updatePost: PropTypes.func.isRequired,
};

export default Post;
