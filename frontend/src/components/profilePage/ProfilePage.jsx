import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Card, Container, Columns } from "react-bulma-components";

import PostList from "../stream/posts/PostList";
import { ProfileStatusView } from "../profileView/ProfileView";
import { retreivePosts } from "../stream/StreamActions";

// buttons
import FollowButton from "./buttons/followButton";
import FriendButton from "./buttons/friendButton";

var profileShowStyle = {
  width: "25em",
};

var buttonLayoutStyle = {
  paddingTop: "2em",
  display: "flex",
};

function ProfileShow(props) {
  const clickFollow = () => {
    // onClick event handler for follow button
  };

  const clickFriend = () => {
    // onClick event handler for friend button
  };

  return (
    <Card style={profileShowStyle}>
      <Card.Content>
        <ProfileStatusView
          displayName={props.author.displayName}
          followerNum={64}
          followingNum={32}
          postNum={props.postNum}
        />
      </Card.Content>
      <Card.Footer style={buttonLayoutStyle}>
        <FollowButton action={clickFollow} />
        <FriendButton action={clickFriend} />
      </Card.Footer>
    </Card>
  );
}

class ProfilePage extends React.Component {
  componentDidMount() {
    this.props.retreivePosts();
  }

  render() {
    if (this.props.loading) {
      return (
        <div class="pageloader is-active">
          <span class="title">Loading</span>
        </div>
      );
    }

    return (
      <Container style={{ marginTop: "1em" }}>
        <Columns>
          <Columns.Column size={4}>
            <ProfileShow postNum={this.props.currentAuthorPosts.length} author={this.props.author} />
          </Columns.Column>
          <Columns.Column size={8}>
            <PostList posts={this.props.currentAuthorPosts} />
          </Columns.Column>
        </Columns>
      </Container>
    );
  }
}

ProfilePage.propTypes = {
  author: PropTypes.object.isRequired,
  retreivePosts: PropTypes.func.isRequired,
  currentAuthorPosts: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  author: state.auth.author,
  currentAuthorPosts: state.stream.currentAuthorPosts,
  loading: state.stream.loading,
});

export default connect(mapStateToProps, { retreivePosts })(withRouter(ProfilePage));
