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
              <Heading size={6} style={{ marginBottom: "-0.5em" }}>
                @{props.post.author.displayName}
              </Heading>
            </Media.Item>
          </Media>
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
