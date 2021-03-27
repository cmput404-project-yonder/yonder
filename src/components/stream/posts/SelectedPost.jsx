import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Card, Modal, Heading, Content } from "react-bulma-components";
import Dividor from "./Dividor";
import EditButton from "./EditButton";
import ShareButton from "./ShareButton";
import LikeButton from "./LikeButton";
import { dividorStyle, individualPostStyle } from "./StyleComponents";
import EditPostForm from "./EditPostForm";
import { updatePost, deletePost } from '../StreamActions';

import { retrievePost } from "./PostActions";

class SelectedPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    }
  }
  
  handleModal = () => {
    this.setState({
      ...this.state,
      isOpen: !this.state.isOpen,
    });
    console.log("Modal is open: ", this.state.isOpen);
  }

  componentDidMount() {
    const {
      match: { params },
    } = this.props;

    this.props.retrievePost(params.id);
  }

  render() {
      
    if (this.props.loading || !this.props.retrievedPost.author) {
        return (
            <div class="pageloader is-active">
                <span class="title">Loading</span>
            </div>
        );
    }

    const IsOwnPost = () => {
      const currentUserId = JSON.parse(window.localStorage.getItem("user")).author;
      if (currentUserId === this.props.retrievedPost.author.id) {
        console.log("This is your own post");
        return true;
      }
      else {
        console.log("This is a shared post");
        return false;
      }
    }

    const IsImage = () => {
        if (this.props.retrievedPost.contentType === "text/plain") {
          return false;
        }
        else if (this.props.retrievedPost.contentType === "text/markdown") {
          return false;
        }
        else {
          return true;
        }
      }

    const isOwnPost = IsOwnPost();
    const isImage = IsImage();

    return (
        <Card style={individualPostStyle}>
            <Card.Header>
                <Card.Header.Title style={{ marginLeft: "1em" }}>
                <p style={{ fontWeight: "250" }}>@{this.props.retrievedPost.author.displayName}</p>
                </Card.Header.Title>
            </Card.Header>
            <Card.Content>
                <Heading size={8}>
                    <p>{this.props.retrievedPost.title}</p>
                </Heading>
                <Dividor style={dividorStyle}/>
                {isImage ?(
                    <Content>
                        <img src={`data:${this.props.retrievedPost.contentType},${this.props.retrievedPost.content}`} />
                    </Content>
                ) : <Content>{this.props.retrievedPost.content}</Content> }
            </Card.Content>
            <Card.Footer>
                <Card.Footer.Item renderAs="a">
                    <LikeButton/>
                </Card.Footer.Item>
                <Card.Footer.Item renderAs="a">
                    <ShareButton/>
                </Card.Footer.Item>
                {isOwnPost ?(
                  <Card.Footer.Item renderAs="a">
                    <EditButton action={this.handleModal} />
                  </Card.Footer.Item>
                ) :  (null)}
                <Modal show={this.state.isOpen} onClose={() => this.handleModal} closeOnBlur closeOnEsc>
                  <EditPostForm
                  setEditModalIsOpen={this.handleModal}
                  post={this.props.retrievedPost}
                  updatePost={this.props.updatePost}
                  deletePost={this.props.deletePost} />
                </Modal>
            </Card.Footer>
        </Card>
    );
  }
}

SelectedPost.propTypes = {
  retrievePost: PropTypes.func.isRequired,
  retrievedPost: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.post.loading,
  retrievedPost: state.post.retrievedPost,
});

export default connect(mapStateToProps, { retrievePost, updatePost, deletePost })(withRouter(SelectedPost));
