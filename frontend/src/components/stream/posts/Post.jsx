import React from "react";
import PropTypes from "prop-types";

import { Card, Content, Heading } from "react-bulma-components";

function Post(props) {
  return (
    <div className="post">
      <Card>
        <Card.Header>
          <Card.Header.Title style={{ marginLeft: "1em" }}>
            <div>
              <p style={{ fontWeight: "lighter" }}>@{props.post.author.displayName}</p>
              <Heading size={5}>{props.post.title}</Heading>
            </div>
          </Card.Header.Title>
        </Card.Header>
        <Card.Content>
          <Content>{props.post.description}</Content>
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
};

export default Post;
