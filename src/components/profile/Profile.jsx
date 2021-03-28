import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Modal, Container, Columns, Section } from "react-bulma-components";

import PostList from "../stream/posts/PostList";
import ProfileDetail from "./ProfileDetail";
import { retrieveAuthor, retrieveAuthorPosts, sendFollow, checkFollowing, editProfile } from "./ProfileActions";

// buttons
import FollowButton from "./buttons/FollowButton";
import EditProfileButton from "./buttons/EditButton";
import ProfileEdit from "./ProfileEdit";

import { color } from "./styling";
import Dividor from "./Dividor";
import { dividorStyle } from "../stream/posts/StyleComponents";
// import FriendButton from "./buttons/FriendButton";


var pageStyle = {
  margin: "auto",
  maxWidth: "800pt",
  minWidth: "400pt",

}

var profileInfoContainer = {
  boxShadow: "0pt 0pt 3pt rgb(0,0,0,0.5)",
  borderRadius: "8pt",
  marginTop: "1.2em",
  marginBottom: "2em",
  paddingRight: "1.5em",
  paddingLeft: "1.5em",
  backgroundColor: color.backgroundCreamLighter,
}

var profileListStyle ={
  minWidth: "300pt",
  maxWidth: "340pt"
}

const buttonLayoutSingleStyle = {
  display: "flex",
  width: "0em",
  marginRight: "5em",       // the width of two button.
  paddingTop: "1em",
  paddingBottom: "1.2em",
}


class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFollowing: false,
      editProfileModalIsOpen: false
    };
  }

  componentDidMount() {
    const {
      match: { params },
    } = this.props;

    this.props.retrieveAuthor(params.id);
    this.props.retrieveAuthorPosts(params.id);
    this.props.checkFollowing(params.id)
  }
  render() {
    var isFollowing = this.props.isFollowing;

    const clickFollow = () => {
      const status_code = this.props.sendFollow(this.props.retrievedAuthor);
      if (status_code == 201) {
        var isFollowing = true;
      }
    };

    const showEditModal = (modalState) => {
      this.setState({editProfileModalIsOpen: modalState})
    };

    if (this.props.loading) {
      return (
        <div class="pageloader is-active">
          <span class="title">Loading</span>
        </div>
      );
    }

    const otherAuthor = () => {
      if (!isFollowing) {
        return (
          <Container style={buttonLayoutSingleStyle}>
                <FollowButton onClick={() => clickFollow()}/>
          </Container>
        );
      } else {
        return null;
      }
    };

    const loggedAuthor = () => {
      return (
          <Container style={buttonLayoutSingleStyle}>
            <EditProfileButton onClick={()=>showEditModal(true)}/>
            <Modal show={this.state.editProfileModalIsOpen} onClose={()=>showEditModal(false)} closeOnBlur closeOnEsc>
              <ProfileEdit
                onCancel={()=>showEditModal(false)}
                editProfile={this.props.editProfile} 
                displayName={this.props.retrievedAuthor.displayName}
                githubURL={""}
              />
            </Modal>
          </Container>
      );
    };

    return (
      <Section >
        <Columns style={pageStyle}>
          <Columns.Column>
            <div className="post-list" style={profileListStyle}>
                <Container style={profileInfoContainer}>
                  <ProfileDetail
                    displayName={this.props.retrievedAuthor.displayName}
                    UUID={this.props.retrievedAuthor.id}
                    githubURL={this.props.retrievedAuthor.github}
                    followerNum={64}
                    followingNum={32}
                    postNum={this.props.retrievedAuthorPosts.length}
                  />
                  <Dividor style={dividorStyle}/>
                  {this.props.match.params.id === this.props.loggedInAuthor.id ? loggedAuthor() : otherAuthor()}

                </Container>
            </div>
          </Columns.Column>
          <Columns.Column>
            <PostList posts={this.props.retrievedAuthorPosts} />
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
  sendFollow: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  loggedInAuthor: state.auth.author,
  loading: state.profile.loading,
  retrievedAuthor: state.profile.retrievedAuthor,
  retrievedAuthorPosts: state.profile.retrievedAuthorPosts,
  isFollowing: state.profile.isFollowing
});

export default connect(mapStateToProps, { retrieveAuthorPosts, retrieveAuthor, sendFollow, checkFollowing, editProfile })(withRouter(Profile));
