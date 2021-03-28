import React from "react";
import PropTypes from "prop-types";
import { Card, Heading } from "react-bulma-components";

import { postStyle } from "./posts/StyleComponents";

function Like(props) {
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

Like.propTypes = {
  like: PropTypes.object.isRequired,
};

export default Like;
