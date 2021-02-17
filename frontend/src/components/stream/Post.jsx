import React from "react";
import PropTypes from "prop-types";

import { Heading } from "react-bulma-components";

function Post(props) {
  return (
    <div className="post">
      <Heading size={5}>
        Hello, {props.post.title}
      </Heading>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired
};

export default Post;
