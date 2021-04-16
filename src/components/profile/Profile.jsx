import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Modal, Container, Columns, Section, Card } from "react-bulma-components";

import PostList from "../stream/posts/PostList";
import ProfileDetail from "./ProfileDetail";
import { retrieveAuthor, retrieveAuthorPosts, sendFollow, deleteFollow, checkFollowing, editProfile, getFollowers, getFriends } from "./ProfileActions";

// buttons
import FollowButton from "./buttons/FollowButton";
import UnfollowButton from "./buttons/UnfollowButton";
import EditProfileButton from "./buttons/EditButton";
import FollowManagerButton from "./buttons/FollowManagerButton";
import ProfileEdit from "./ProfileEdit";
// import FriendButton from "./buttons/FriendButton";

import { color } from "../../styling/ColorFontConfig";
import { postStyle } from "../../styling/StyleComponents";
import { ProfileIconBoy } from "../../styling/svgIcons";

import {updatePost, sharePost, likePost, deletePost} from "../stream/StreamActions";
import FollowManager from "./FollowManager";



var pageStyle = {
  margin: "auto",
  maxWidth: "980pt",
  minWidth: "400pt",
}

var profileDetailContainerStyle = {
  paddingBottom: "0em",
  paddingLeft: "1.5em",
  paddingRight: "1.5em",
}
var profileInfoContainer = {
  margin: "0em",
  backgroundColor: "transparent",
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

    this.followers = [];
    this.friends = [];

    this.state = {
      editProfileModalIsOpen: false,
      followManagerIsOpen: false,
      isFollowing: false,
      friendCount: "",
      followerCount: "",
    };
  }

  getDisplayNum = (num) => {
    if (num >= 10**9) {
        // no one is that famous
        return Math.floor(num/10**9) + 'b';
    }
    if (num >= 10**6) {
        return Math.floor(num/10**6) + 'm';
    }
    if (num >= 10**3) {
        return Math.floor(num/10**3) + 'k';
    }

    return num;
}

  setFriends = (data) => {
    // count and maybe used in the future for following management panel
    if (data === null) {
      this.setState({friendCount: "Unknown"});
      this.friends = [];
    } else {
      this.setState({friendCount: this.getDisplayNum(data.length)});
      this.friends = data;
    }
  }

  setFollows = (data) => {
    // count and maybe used in the future for following management panel
    if (data === null) {
      this.setState({followerCount: "Unknown"});
      this.followers = [];
    } else {
      this.setState({followerCount: this.getDisplayNum(data.length)});
      this.followers = data;
    }
  }

  getFriendsLocally = () => {
    // without trigger rerender
    return this.friends;
  }

  getFollowersLocally = () => {
    return this.followers;
  }
  

  componentDidMount() {
    const {
      match: { params },
    } = this.props;

    this.props.retrieveAuthor(params.id);
    this.props.retrieveAuthorPosts(params.id);
    this.props.checkFollowing(params.id);
    this.props.getFollowers(params.id, this.setFollows);
    this.props.getFriends(params.id, this.setFriends)
  }

  render() {
    if (this.state.isFollowing !== this.props.isFollowing) {
      this.setState({ isFollowing: this.props.isFollowing });
    }

    const clickFollow = () => {
      if (this.props.loggedInAuthor.id === undefined) {
        // redirect to login
        window.location.href = '/login'
      } else {
        this.props.sendFollow(this.props.retrievedAuthor, ()=> window.location.pathname = window.location.pathname);
      }
    };

    const clickUnfollow = () => {
      this.props.deleteFollow(this.props.retrievedAuthor, ()=> window.location.pathname = window.location.pathname);
    }

    const showEditModal = (modalState) => {
      this.setState({editProfileModalIsOpen: modalState})
    };

    const showFollowManager = (modalState) => {
      this.setState({followManagerIsOpen: modalState})
    };

    const followButton = () => {
      return <FollowButton onClick={() => clickFollow()}/>
    }

    const unfollowButton = () => {
      return <UnfollowButton onClick={clickUnfollow}/>
    }

    const otherAuthor = () => {
      return (
        <Container>
          {/* <hr style={{...shadowDividorStyle, transform: "rotate(180deg)", backgroundColor: "transparent"}}></hr> */}
          <Container style={buttonLayoutStyle}>
            {this.state.isFollowing ? unfollowButton() : followButton()}
          </Container>
        </Container>
      );
    };

    const loggedAuthor = () => {
      return (
          <Container>
          {/* <hr style={{...shadowDividorStyle, transform: "rotate(180deg)", backgroundColor: "transparent", marginTop: "1em",}}></hr> */}
          <Container style={{...buttonLayoutStyle, width: "50%"}}>
            <EditProfileButton onClick={()=>showEditModal(true)}/>
            <FollowManagerButton onClick={()=>showFollowManager(true)}/>
            <Modal className="animate__animated animate__fadeIn animate__faster" show={this.state.editProfileModalIsOpen} onClose={()=>showEditModal(false)} closeOnBlur closeOnEsc>
              <ProfileEdit
                onCancel={()=>showEditModal(false)}
                editProfile={(newprofile) => {this.props.editProfile(newprofile, () => this.props.retrieveAuthorPosts(this.props.retrievedAuthor.id));}} 
                displayName={this.props.retrievedAuthor.displayName}
                githubURL={this.props.retrievedAuthor.github}
              />
              </Modal>


            <Modal className="animate__animated animate__fadeIn animate__faster" show={this.state.followManagerIsOpen} onClose={()=>showFollowManager(false)} closeOnBlur closeOnEsc>
              <FollowManager
                onCancel={()=>showFollowManager(false)}
                deleteFollow={this.props.deleteFollow} 
                getFollowers={this.getFollowersLocally}
                getFriends={this.getFriendsLocally}
              />
            </Modal>



          </Container>
          </Container>
      );
    };

    const profileCard = () => {
      return (
        <div className="post-list animate__animated animate__fadeInUp" style={{marginBottom: "5em"}}>
          <Card style={{...postStyle, height: "auto", fontSize: "1em", minWidth: "320pt", maxWidth: "385pt", borderRadius: "12pt", margin: "auto", paddingBottom: "0.8em"}}>
            <Container>
              <Container style={{marginTop: "3em", marginBottom: "-1.5em"}}>
                  <Container style={{fill: color.baseLightGrey}}>
                    <ProfileIconBoy svgScale={"160"}/>  
                  </Container>
                  {/* <p style={{fontSize: "2.8em", fontWeight: "450", color: color.baseLightGrey}}>Author Profile</p> */}
              </Container>
            </Container>

            <Container style={profileInfoContainer}>
                <Container style={profileDetailContainerStyle}>
                <ProfileDetail 
                  displayName={this.props.retrievedAuthor.displayName}
                  UUID={this.props.retrievedAuthor.id}
                  githubURL={this.props.retrievedAuthor.github}
                  followerNum={this.state.followerCount}
                  friendNum={this.state.friendCount}
                  postNum={this.getDisplayNum(this.props.retrievedAuthorPosts.length)}
                />
                </Container>
                {this.props.match.params.id === this.props.loggedInAuthor.id ? loggedAuthor() : otherAuthor()}

              </Container>

          </Card>
        </div>        
      )

    }


    if (this.props.loading) {
      return (
        <div class="pageloader is-active animate__animated animate__fadeIn animate__faster">
          <span class="title">Loading</span>
        </div>
      );
    }

    const updatePostWrapper = (editedPost) => {
      this.props.updatePost(editedPost, ()=>this.props.retrieveAuthorPosts(this.props.retrievedAuthor.id));
    }

    const sharePostWrapper = (post) => {
      this.props.sharePost(post, ()=>this.props.retrieveAuthorPosts(this.props.retrievedAuthor.id));
    }

    const deletePostWrapper = (post) => {
      this.props.deletePost(post, ()=>this.props.retrieveAuthorPosts(this.props.retrievedAuthor.id));
    }

    return (
      <Section >
        <Columns style={pageStyle}>

          <Columns.Column>
          <div style={{marginTop: "1.5em"}}>
            {profileCard()}
          </div>
          </Columns.Column>

          <Columns.Column>
            <div className="post-list animate__animated animate__fadeInUp" style={{marginTop: "-4em"}}>
            <PostList 
              posts={this.props.retrievedAuthorPosts}
              
              updatePost={updatePostWrapper} 
              deletePost={deletePostWrapper} 
              likePost={this.props.likePost}
              sharePost={sharePostWrapper}
              interactive={true}
              hasInbox={false}

            />
            </div>
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
  auth: state.auth,
  loggedInAuthor: state.auth.author,
  loading: state.profile.loading,
  retrievedAuthor: state.profile.retrievedAuthor,
  retrievedAuthorPosts: state.profile.retrievedAuthorPosts,
  isFollowing: state.profile.isFollowing
});

export default connect(mapStateToProps, {
  retrieveAuthorPosts,
  retrieveAuthor,
  sendFollow,
  deleteFollow,
  checkFollowing,
  editProfile,
  updatePost,
  sharePost,
  deletePost,
  likePost,
  getFollowers,
  getFriends,

})(withRouter(Profile));
