import React from "react";
import PropTypes from "prop-types";

import { Card, Content, Media, Heading } from "react-bulma-components";

function Post(props) {
  return (
    <div className="post">
      <Card>
        <Card.Header>
          <Card.Header.Title>{props.post.title}</Card.Header.Title>
        </Card.Header>
        <Card.Content>
          <Media>
            <Media.Item>
              <Heading size={6}>Mark Twain</Heading>
            </Media.Item>
          </Media>
          <Content>{props.post.content}</Content>
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
};

export default Post;
