import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Container, Columns, Section } from "react-bulma-components";
import "bulma-pageloader/dist/css/bulma-pageloader.min.css";

import PostList from "./posts/PostList";
import PopupModal from "./posts/PopupModal";
import { createPost, retreivePosts } from "./StreamActions";

class Stream extends Component {
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
      <Section>
        <Container fluid>
          <PopupModal createPost={this.props.createPost} />
          <Columns centered>
            <Columns.Column>
              <PostList posts={this.props.currentAuthorPosts} />
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
  retreivePosts: PropTypes.func.isRequired,
  currentAuthorPosts: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  author: state.auth.author,
  currentAuthorPosts: state.stream.currentAuthorPosts,
  loading: state.stream.loading,
});

export default connect(mapStateToProps, { createPost, retreivePosts })(withRouter(Stream));
