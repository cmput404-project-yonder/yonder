import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Container, Columns, Section } from "react-bulma-components";

import PostList from "./posts/PostList";
import PopupModal from "./posts/modals/PopupModal";

import { buttonLayerContainerStyle, streamLayerContainerStyle, newPostButtonStyle, pageStyle } from "../../styling/StyleComponents";
import { createPost, updatePost, sharePost, likePost, retrieveLoggedInAuthorPosts, deletePost, retrieveInbox, retrieveAllAuthors } from "./StreamActions";

class Stream extends Component {
  componentDidMount() {
    this.props.retrieveLoggedInAuthorPosts();
    this.props.retrieveInbox();
    if (!this.props.allAuthors) {
      this.props.retrieveAllAuthors();
    }
  }

  render() {
    if (this.props.loading) {
      return (
        <div className="pageloader is-active animate__animated animate__fadeIn animate__faster">
          <span className="title">Loading</span>
        </div>
      );
    }

    const posts = [].concat(this.props.currentAuthorPosts, this.props.inboxPosts);

    return (
      <Section style={pageStyle}>
        <div style={buttonLayerContainerStyle}>
          <Container style={newPostButtonStyle}>
            <PopupModal createPost={this.props.createPost} />
          </Container>
        </div>
        <div style={streamLayerContainerStyle}>
          <Container fluid>
              <Columns centered>
                <Columns.Column>
                  <PostList
                    posts={posts}
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
  inboxPosts: PropTypes.array.isRequired,
  allAuthors: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  author: state.auth.author,
  currentAuthorPosts: state.stream.currentAuthorPosts,
  inboxPosts: state.stream.currentInboxPosts,
  loading: state.stream.loading,
  allAuthors: state.allAuthors,
});

export default connect(mapStateToProps, {
  createPost,
  updatePost,
  sharePost,
  deletePost,
  likePost,
  retrieveLoggedInAuthorPosts,
  retrieveAllAuthors,
  retrieveInbox,
})(withRouter(Stream));
