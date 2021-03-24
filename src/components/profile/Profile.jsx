import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Card, Container, Columns, Section } from "react-bulma-components";

import PostList from "../stream/posts/PostList";
import { ProfileDetail } from "./ProfileDetail";
import { retrieveAuthor, retrieveAuthorPosts } from "./ProfileActions";

// buttons
import FollowButton from "./buttons/FollowButton";
import FriendButton from "./buttons/FriendButton";
import EditProfileButton from "./buttons/EditButton";

import { color,font } from "./styling";

var pageStyle = {
  margin: "auto",
  maxWidth: "1000pt",
  minWidth: "400pt",

}

var profileListStyle ={
}

var streamPostStyle ={
}

var profileShowStyle = {
  boxShadow: "0pt 0pt 8pt #CCCCCC",
  borderRadius: "6pt",
  backgroundColor: color.backgroundCreamLighter,
  marginBottom: "2em",
  marginTop: "4em",
  fontFamily: font.segoeUI,
  fontWeight: "350",
  fontSize: "1.3em",
  color: color.baseBlack,
  minHeight: "25em",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
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
        <ProfileDetail
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

class Profile extends React.Component {
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
      <Section >
        <Columns style={pageStyle}>
          <Columns.Column>
            <div className="post-list" style={profileListStyle}>
            <ProfileShow
              postNum={this.props.retrievedAuthorPosts.length}
              retrievedAuthor={this.props.retrievedAuthor}
              editable={this.props.match.params.id === this.props.loggedInAuthor.id}
            />
            </div>
          </Columns.Column>
          <Columns.Column>
            <PostList posts={this.props.retrievedAuthorPosts} style={streamPostStyle} />
          </Columns.Column>
        </Columns>
      </Section>
    );
  }
}

Profile.propTypes = {
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

export default connect(mapStateToProps, { retrieveAuthorPosts, retrieveAuthor })(withRouter(Profile));
