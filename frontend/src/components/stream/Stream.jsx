import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Container, Columns, Section } from "react-bulma-components";
import "bulma-pageloader/dist/css/bulma-pageloader.min.css";

import PostList from "./posts/PostList";
import PopupModal from "./posts/PopupModal";
import { createPost, updatePost, retreivePosts, deletePost } from "./StreamActions";

class Stream extends Component {
  componentDidMount() {
    this.props.retreivePosts();
  }

  render() {
    const posts = this.props.currentAuthorPosts;

    if (this.props.loading) {
      return (
        <div className="pageloader is-active">
          <span className="title">Loading</span>
        </div>
      );
    }

    return (
      <Section>
        <Container fluid>
          <PopupModal createPost={this.props.createPost} />
          <Columns centered>
            <Columns.Column>
              <PostList posts={posts} updatePost={this.props.updatePost} deletePost={this.props.deletePost} />
            </Columns.Column>
          </Columns>
        </Container>
      </Section>
    );
  }
}

Stream.propTypes = {
  author: PropTypes.object.isRequired,
  createPost: PropTypes.func.isRequired,
  updatePost: PropTypes.func.isRequired,
  retreivePosts: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  currentAuthorPosts: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  author: state.auth.author,
  currentAuthorPosts: state.stream.currentAuthorPosts,
  loading: state.stream.loading,
});

export default connect(mapStateToProps, { createPost, updatePost, retreivePosts, deletePost })(withRouter(Stream));
