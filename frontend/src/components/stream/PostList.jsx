import React from "react";
import PropTypes from "prop-types";
import { Container, List } from "react-bulma-components";

import Post from "./Post";

function PostList(props) {
  const postList = props.posts.map((post) => <Post post={post} />);
  return (
    <div className="post-list">
      <List hoverable>{postList}</List>
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.object.isRequired,
};

export default PostList;
