import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Container, Columns, Section } from "react-bulma-components";
import "bulma-pageloader/dist/css/bulma-pageloader.min.css";

import PostList from "./posts/PostList";
import PopupModal from "./posts/PopupModal";
import { createPost, updatePost, retrieveLoggedInAuthorPosts, deletePost } from "./StreamActions";




var buttonLayerContainerStyle = {
  gridColumn: "1",
  gridRow: "1",
  width: "100%",
  height: "100%",
}

var streamLayerContainerStyle = {
  gridColumn: "1",
  gridRow: "1",
  width: "100%",
  height: "100%",
  
}


var newPostButtonStyle = {
  float: "right",
  zIndex: "1",
  position: "fixed",
  right: "5%",
  bottom: "5%",
}

var pageStyle = {
  display: "grid"

}

var postStreamStyle = {
}

class Stream extends Component {
  componentDidMount() {
    this.props.retrieveLoggedInAuthorPosts();
  }

  render() {
    if (this.props.loading) {
      return (
        <div className="pageloader is-active">
          <span className="title">Loading</span>
        </div>
      );
    }

    return (
      <Section style={pageStyle}>
        <div style={buttonLayerContainerStyle}>
          <Container style={newPostButtonStyle}><PopupModal createPost={this.props.createPost} /></Container>
        </div>
        <div style={streamLayerContainerStyle}>
          <Container fluid>
              <Columns centered>
                <Columns.Column>
                  <PostList
                    posts={this.props.currentAuthorPosts}
                    updatePost={this.props.updatePost}
                    deletePost={this.props.deletePost}
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

export default connect(mapStateToProps, { createPost, updatePost, retrieveLoggedInAuthorPosts, deletePost })(
  withRouter(Stream)
);
