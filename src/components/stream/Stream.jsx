import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Container, Columns, Section } from "react-bulma-components";

import PostList from "./posts/PostList";
import PopupModal from "./posts/PopupModal";

import InboxModalPopUp from "../inbox/InboxModalPopUp";
import { buttonLayerContainerStyle, streamLayerContainerStyle, newPostButtonStyle, pageStyle } from "../../styling/StyleComponents";
import { createPost, updatePost, sharePost, likePost, retrieveLoggedInAuthorPosts, deletePost, retrieveInbox } from "./StreamActions";


import NavigationBar from "../NavigationBar";

class Stream extends Component {
  componentDidMount() {
    this.props.retrieveLoggedInAuthorPosts();
    this.props.retrieveInbox();
  }

  render() {
    if (this.props.loading) {
      return (
        <div className="pageloader is-active animate__animated animate__fadeIn animate__faster">
          <span className="title">Loading</span>
        </div>
      );
    }

    return (
      <Section style={pageStyle}>
        <NavigationBar/>
        <div style={buttonLayerContainerStyle}>
          <Container style={newPostButtonStyle}>
            <InboxModalPopUp />
            <PopupModal createPost={this.props.createPost} />
          </Container>
        </div>
        <div style={streamLayerContainerStyle}>
          <Container fluid>
              <Columns centered>
                <Columns.Column>
                  <PostList
                    posts={this.props.currentAuthorPosts}
                    updatePost={this.props.updatePost}
                    deletePost={this.props.deletePost}
                    sharePost={this.props.sharePost}
                    likePost={this.props.likePost}
                    interactive={true}
                  />
                </Columns.Column>
              </Columns>
            </Container>
        </div>
      </Section>

    );
  }
}

Stream.propTypes = {
  author: PropTypes.object.isRequired,
  createPost: PropTypes.func.isRequired,
  updatePost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  sharePost: PropTypes.func.isRequired,
  retrieveLoggedInAuthorPosts: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  currentAuthorPosts: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  author: state.auth.author,
  currentAuthorPosts: state.stream.currentAuthorPosts,
  loading: state.stream.loading,
});

export default connect(mapStateToProps, {
  createPost,
  updatePost,
  sharePost,
  likePost,
  retrieveLoggedInAuthorPosts,
  deletePost,
  retrieveInbox,
})(withRouter(Stream));