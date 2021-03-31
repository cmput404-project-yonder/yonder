import React from "react";
import PropTypes from "prop-types";
import { Card, Heading } from "react-bulma-components";

import { postStyle } from "../../styling/StyleComponents";

export function Post(props) {
  return (
    <Card style={postStyle}>
      <Card.Content>
        <b>@{props.post.author.displayName}</b> made a new post
        <br />
        <Heading size={4}>{props.post.title}</Heading>
      </Card.Content>
    </Card>
  );
}

export function Follow(props) {
  return (
      <Card>
        <Card.Content>
          <Heading size={4}>
            <b>{props.follower.displayName}</b> is now following you
          </Heading>
        </Card.Content>
      </Card>
  );
}

export function Like(props) {
  return (
      <Card style={postStyle}>
        <Card.Content>
          <Heading size={4}>
            <b>@{props.like.actor.displayName}</b> liked your post <b>{props.like.object.title}</b>
          </Heading>
        </Card.Content>
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
