import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Container, Columns, Section, List } from "react-bulma-components";
import "bulma-pageloader/dist/css/bulma-pageloader.min.css";

import PopupModal from "./posts/PopupModal";
import PostList from "./posts/PostList";
import Follow from "./Follow";
import Like from "./Like";
import { buttonLayerContainerStyle, streamLayerContainerStyle, newPostButtonStyle, pageStyle } from "../../styling/StyleComponents";
import { createPost, updatePost, sharePost, deletePost, retrieveInbox} from "./StreamActions";

import InboxModalPopUp from "../inbox/InboxModalPopUp";

class Stream extends Component {
  componentDidMount() {
    this.props.retrieveInbox(this.props.author.id);
  }

  render() {
    if (this.props.loading) {
      return (
        <div className="pageloader is-active">
          <span className="title">Loading</span>
        </div>
      );
    }

    const follows = this.props.inboxFollows.map((follow) => <Follow follower={follow}/>);
    const followList = () => {
      return (
        <div className="post-list">
          <List hoverable>{follows}</List>
        </div>
      );
    }

    const likes = this.props.inboxLikes.map((like) => <Like like={like}/>);
    const likeList = () => {
      return (
        <div className="post-list">
          <List hoverable>{likes}</List>
        </div>
      );
    }

    return (
      <Section style={pageStyle}>
        <div style={buttonLayerContainerStyle}>
          <Container style={newPostButtonStyle}><InboxModalPopUp/><PopupModal createPost={this.props.createPost} /></Container>
        </div>
        <div style={streamLayerContainerStyle}>
          <Container fluid>
              <Columns centered>
                <Columns.Column>
                  <PostList
                    posts={this.props.inboxPosts}
                    updatePost={this.props.updatePost}
                    deletePost={this.props.deletePost}
                    sharePost={this.props.sharePost}
                  />
                  { followList() }
                  { likeList() }
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
  deletePost: PropTypes.func.isRequired,
  retrieveInbox: PropTypes.func.isRequired,
  inboxPosts: PropTypes.array.isRequired,
  inboxFollows: PropTypes.array.isRequired,
  inboxLikes: PropTypes.array.isRequired,
  inboxComments: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  author: state.auth.author,
  inboxPosts: state.stream.currentInboxPosts,
  inboxFollows: state.stream.currentInboxFollows,
  inboxLikes: state.stream.currentInboxLikes,
  inboxComments: state.stream.currentInboxComment,
  loading: state.stream.loading,
});

export default connect(mapStateToProps, { createPost, updatePost, sharePost, deletePost, retrieveInbox })(
  withRouter(Stream)
);
