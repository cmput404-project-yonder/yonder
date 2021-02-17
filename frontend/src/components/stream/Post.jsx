import React from "react";
import PropTypes from "prop-types";

function Post(props) {
  return (
    <div>
      <h1>
        Hello, {props.post.title}
      </h1>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired
};

export default Post;
