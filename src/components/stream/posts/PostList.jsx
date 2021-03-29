import React from "react";
import PropTypes from "prop-types";
import { List } from "react-bulma-components";

import Post from "./Post";

function PostList(props) {
  const postList = props.posts.map((post) => <Post post={post} updatePost={props.updatePost} deletePost={props.deletePost} sharePost={props.sharePost} likePost={props.likePost}/>);
  return (
    <div className="post-list">
      <List hoverable>{postList}</List>
    </div>
  );
  console.log(postList);
}

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
  updatePost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
};

export default PostList;
