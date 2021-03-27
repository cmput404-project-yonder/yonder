import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Card, Container, Columns, Section } from "react-bulma-components";

import PostList from "../stream/posts/PostList";
import ProfileDetail from "./ProfileDetail";
import { retrieveAuthor, retrieveAuthorPosts, sendFollow, checkFollowing } from "./ProfileActions";

// buttons
import FollowButton from "./buttons/FollowButton";
import EditProfileButton from "./buttons/EditButton";


import { profileShowStyle } from "../stream/posts/StyleComponents"; 
import { color,font } from "./styling";


var pageStyle = {
  margin: "auto",
  maxWidth: "1000pt",
  minWidth: "400pt",

}

var footerStyle = {
  display: "flex",
  width: "100%",
}

var profileInfoContainer = {
  boxShadow: "0pt 0pt 3pt rgb(0,0,0,0.5)",
  borderRadius: "8pt",
  marginLeft: "-1.2em",
  marginRight: "-1.2em",
  paddingRight: "1.5em",
  paddingLeft: "1.5em",
  backgroundColor: color.backgroundCreamLighter,
}

var profileListStyle ={
  minWidth: "380pt",
  maxWidth: "300pt"
}

var streamPostStyle ={
}

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFollowing: false
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

    const clickEdit = () => {
      // onClick event handler for friend button
    };

    const otherAuthor = () => {
      if (!isFollowing) {
        return (
          <Card.Footer style={footerStyle}>
            <Card.Footer.Item onClick={() => clickFollow()}>
              <Button color="light" >
                <FollowButton />
              </Button>
            </Card.Footer.Item>
          </Card.Footer>
        );
      } else {
        return null;
      }
    };

    const loggedAuthor = () => {
      return (
        <Card.Footer style={footerStyle}>
          <Card.Footer.Item renderAs="a" onClick={clickEdit} >
            <EditProfileButton/>
          </Card.Footer.Item>
        </Card.Footer>
      );
    };

    if (this.props.loading) {
      return (
        <div class="pageloader is-active">
          <span class="title">Loading</span>
        </div>
      );
    }
    console.log(this.props.retrievedAuthorPosts);

    return (
      <Section >
        <Columns style={pageStyle}>
          <Columns.Column>
            <div className="post-list" style={profileListStyle}>
              <Card style={profileShowStyle}>
                <Container style={profileInfoContainer}>
                  <ProfileDetail
                    displayName={this.props.retrievedAuthor.displayName}
                    followerNum={64}
                    followingNum={32}
                    postNum={this.props.retrievedAuthorPosts.length}
                  />
                </Container>
                {this.props.match.params.id === this.props.loggedInAuthor.id ? loggedAuthor() : otherAuthor()}
              </Card>
            {/* <ProfileShow */}
            {/*   postNum={this.props.retrievedAuthorPosts.length} */}
            {/*   retrievedAuthor={this.props.retrievedAuthor} */}
            {/*   editable={this.props.match.params.id === this.props.loggedInAuthor.id} */}
            {/*   clickFollow={clickFollow} */}
            {/*   isFollowing={this.state.isFollowing} */}
            {/* /> */}
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

export default connect(mapStateToProps, { retrieveAuthorPosts, retrieveAuthor, sendFollow, checkFollowing })(withRouter(Profile));
