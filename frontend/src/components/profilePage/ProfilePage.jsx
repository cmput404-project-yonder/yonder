import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Card, Container, Columns } from "react-bulma-components";

import PostList from "../stream/posts/PostList";
import { ProfileStatusView } from "../profileView/ProfileView";
import { retrieveAuthor, retrieveAuthorPosts } from "../profilePage/ProfileActions";

// buttons
import FollowButton from "./buttons/followButton";
import FriendButton from "./buttons/friendButton";
import EditProfileButton from "../profileView/EditButton";

var profileShowStyle = {
  width: "25em",
};

function ProfileShow(props) {
  const clickFollow = () => {
    // onClick event handler for follow button
  };

  const clickFriend = () => {
    // onClick event handler for friend button
  };

  const clickEdit = () => {
    // onClick event handler for friend button
  };

  const otherAuthor = () => {
    return (
      <Card.Footer>
        <FollowButton action={clickFollow} />
        <FriendButton action={clickFriend} />
      </Card.Footer>
    );
  };

  const loggedAuthor = () => {
    return (
      <Card.Footer>
        <EditProfileButton action={clickEdit} />
      </Card.Footer>
    );
  };

  return (
    <Card style={profileShowStyle}>
      <Card.Content>
        <ProfileStatusView
          displayName={props.retrievedAuthor.displayName}
          followerNum={64}
          followingNum={32}
          postNum={props.postNum}
        />
      </Card.Content>
      {props.editable ? loggedAuthor() : otherAuthor()}
    </Card>
  );
}

class ProfilePage extends React.Component {
  componentDidMount() {
    const {
      match: { params },
    } = this.props;

    this.props.retrieveAuthor(params.id);
    this.props.retrieveAuthorPosts(params.id);
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
            <ProfileShow
              postNum={this.props.retrievedAuthorPosts.length}
              retrievedAuthor={this.props.retrievedAuthor}
              editable={this.props.match.params.id === this.props.loggedInAuthor.id}
            />
          </Columns.Column>
          <Columns.Column size={8}>
            <PostList posts={this.props.retrievedAuthorPosts} />
          </Columns.Column>
        </Columns>
      </Container>
    );
  }
}

ProfilePage.propTypes = {
  loggedInAuthor: PropTypes.object.isRequired,
  retrieveAuthor: PropTypes.func.isRequired,
  retrievedAuthor: PropTypes.object.isRequired,
  retrieveAuthorPosts: PropTypes.func.isRequired,
  retrievedAuthorPosts: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  loggedInAuthor: state.auth.author,
  loading: state.profile.loading,
  retrievedAuthor: state.profile.retrievedAuthor,
  retrievedAuthorPosts: state.profile.retrievedAuthorPosts,
});

export default connect(mapStateToProps, { retrieveAuthorPosts, retrieveAuthor })(withRouter(ProfilePage));
