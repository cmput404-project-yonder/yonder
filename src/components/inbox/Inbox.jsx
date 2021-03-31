import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Columns, List, Container } from "react-bulma-components";

import { Post, Follow, Like } from "./InboxItems";

function Inbox(props) {

  const follows = props.inboxFollows.map((follow) => <Follow key={follow.displayName} follower={follow} />);
  const followList = () => {
    return (
      <div className="post-list">
        <List hoverable>{follows}</List>
      </div>
    );
  };

  const likes = props.inboxLikes.map((like) => <Like key={like.id} like={like} />);
  const likeList = () => {
    return (
      <div className="post-list">
        <List hoverable>{likes}</List>
      </div>
    );
  };

  const posts = props.inboxPosts.map((post) => <Post key={post.id} post={post} />);
  const postList = () => {
    return (
      <div className="post-list">
        <List hoverable>{posts}</List>
      </div>
    );
  };

  const renderSelectedTab = () => {
    console.log("Hello")
    switch (props.selectedTab) {
      case "like":
        console.log("Like")
        return likeList();
      case "follow":
        console.log("F")
        return followList();
      case "post":
        console.log("PPPP")
        return postList();
      default:
        console.log("NOOO")
        break;
    }
  }

  return (
    <Columns centered>
      <Columns.Column style={{height: "40em"}}>
        {renderSelectedTab()}
      </Columns.Column>
    </Columns>
  );
}

Inbox.propTypes = {
  author: PropTypes.object.isRequired,
  inboxPosts: PropTypes.array.isRequired,
  inboxFollows: PropTypes.array.isRequired,
  inboxLikes: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  author: state.auth.author,
  inboxPosts: state.stream.currentInboxPosts,
  inboxFollows: state.stream.currentInboxFollows,
  inboxLikes: state.stream.currentInboxLikes,
});

export default connect(mapStateToProps, { })(
  withRouter(Inbox)
);
