import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Columns, List, Container } from "react-bulma-components";

import { Post, Follow, Like } from "./InboxItems";

import { InboxEmptyIcon } from "../../styling/svgIcons";
import { color } from "../../styling/ColorFontConfig";


function Inbox(props) {

  const follows = props.inboxFollows.map((follow) => <Follow key={follow.displayName} follower={follow} />);
  const followList = () => {
    if (follows.length === 0) {
      return (
        <Container style={{textAlign: "center", marginRight: "1em", marginTop: "40%"}}>
          <Container style={{fill: color.baseLightGrey}}>
            <InboxEmptyIcon svgScale={"80"}/>  
          </Container>
          <p style={{fontSize: "2em", color: color.baseLightGrey}}>Empty</p>
        </Container>
      );
    } else {
      return (
        <div className="post-list animate__animated animate__fadeIn animate__faster">
          <List hoverable>{follows}</List>
        </div>
      );
    }
  };

  const likes = props.inboxLikes.map((like) => <Like key={like.id} like={like} />);
  const likeList = () => {

    if (likes.length === 0) {
      return (
        <Container style={{textAlign: "center", marginRight: "1em", marginTop: "40%"}}>
          <Container style={{fill: color.baseLightGrey}}>
            <InboxEmptyIcon svgScale={"80"}/>  
          </Container>
          <p style={{fontSize: "2em", color: color.baseLightGrey}}>Empty</p>
        </Container>
      );
    } else {
      return (
        <div className="post-list animate__animated animate__fadeIn animate__faster">
          <List hoverable>{likes}</List>
        </div>
      );
    }
  };

  const posts = props.inboxPosts.map((post) => <Post key={post.id} post={post} />);
  const postList = () => {
    if (posts.length === 0) {
      return (
        <Container style={{textAlign: "center", marginRight: "1em", marginTop: "40%"}}>
          <Container style={{fill: color.baseLightGrey}}>
            <InboxEmptyIcon svgScale={"80"}/>  
          </Container>
          <p style={{fontSize: "2em", color: color.baseLightGrey}}>Empty</p>
        </Container>
      );
    } else {
      return (
        <div className="post-list animate__animated animate__fadeIn animate__faster">
          <List hoverable>{posts}</List>
        </div>
      );
    }
  };

  const RenderSelectedTab = () => {
    console.log("Hello")
    switch (props.selectedTab) {
      case "like":
        return likeList();
      case "follow":
        return followList();
      case "post":
        return postList();
      default:
        break;
    }
  }

  return (
    <Columns centered>
      <Columns.Column style={{height: "40em", overflowY: "scroll"}} className="hideScroll">
        <RenderSelectedTab />
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
