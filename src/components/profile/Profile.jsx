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
// import FriendButton from "./buttons/FriendButton";

import { color } from "./styling";
import Dividor from "./Dividor";
import { dividorStyle } from "../../styling/StyleComponents";

var pageStyle = {
  margin: "auto",
  maxWidth: "820pt",
  minWidth: "400pt",

}

var profileDetailContainerStyle = {
  paddingBottom: "0em",
  paddingLeft: "1.5em",
  paddingRight: "1.5em",

}

var profileInfoContainer = {
  boxShadow: "0pt 0pt 8pt rgb(0,0,0,0.5)",
  borderRadius: "8pt",
  marginTop: "0.5em",
  marginBottom: "2em",
  marginRight: "1.5em",
  marginLeft: "1.5em",
  backgroundColor: color.backgroundCreamLighter,
}

var profileListStyle ={
  minWidth: "300pt",
  maxWidth: "340pt"
}

const buttonLayoutStyle = {
  display: "flex",
  textAlign: "center",
  paddingTop: "6pt",
  paddingBottom: "12pt",
}


class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
      if (this.props.loggedInAuthor.id === undefined) {
        // redirect to login
        window.location.href = '/'
      } else {
        const status_code = this.props.sendFollow(this.props.retrievedAuthor);
        if (status_code === 201) {
          isFollowing = true;
        }        
      }


    };

    const showEditModal = (modalState) => {
      this.setState({editProfileModalIsOpen: modalState})
    };

    if (this.props.loading) {
      return (
        <div class="pageloader is-active animate__animated animate__fadeIn animate__faster">
          <span class="title">Loading</span>
        </div>
      );
    }

    const otherAuthor = () => {
      if (!isFollowing) {
        return (
          <Container>
          <Dividor style={dividorStyle}/>
          <Container style={buttonLayoutStyle}>
                <FollowButton onClick={() => clickFollow()}/>
          </Container>
          </Container>
        );
      } else {
        return null;
      }
    };

    const loggedAuthor = () => {
      return (
          <Container>
            <Dividor style={dividorStyle}/>
          <Container style={buttonLayoutStyle}>
            <EditProfileButton onClick={()=>showEditModal(true)}/>
            <Modal className="animate__animated animate__fadeIn animate__faster" show={this.state.editProfileModalIsOpen} onClose={()=>showEditModal(false)} closeOnBlur closeOnEsc>
              <ProfileEdit
                onCancel={()=>showEditModal(false)}
                editProfile={this.props.editProfile} 
                displayName={this.props.retrievedAuthor.displayName}
                githubURL={this.props.retrievedAuthor.github}
              />
            </Modal>
          </Container>
          </Container>
      );
    };

    return (
      <Section >
        <Columns style={pageStyle}>
          <Columns.Column>
            <div className="post-list" style={profileListStyle}>
                <Container style={profileInfoContainer}>
                  <Container style={profileDetailContainerStyle}>
                  <ProfileDetail 
                    displayName={this.props.retrievedAuthor.displayName}
                    UUID={this.props.retrievedAuthor.id}
                    githubURL={this.props.retrievedAuthor.github}
                    followerNum={64}
                    followingNum={32}
                    postNum={this.props.retrievedAuthorPosts.length}
                  />
                  </Container>
                  {this.props.match.params.id === this.props.loggedInAuthor.id ? loggedAuthor() : otherAuthor()}

                </Container>
            </div>
          </Columns.Column>
          <Columns.Column>
            <PostList posts={this.props.retrievedAuthorPosts} interactive={true}/>
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
