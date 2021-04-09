import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Modal, Button, Content, Section, Card,Container,Columns, List } from "react-bulma-components";
import Dividor from "./Dividor";
import EditButton from "./buttons/EditButton";
import ShareButton from "./buttons/ShareButton";
import LikeButton from "./buttons/LikeButton";
import LikedButton from "./buttons/LikedButton";
import { dividorStyle, pageStyle,buttonLayerContainerStyle,newPostButtonStyle, streamLayerContainerStyle, postContainerStyle, postStyle, signatureStyle, postTitleStyle, DescriptionStyle, contentStyle, postContentStyle, categoriesStyle, footerButtonLayoutStyle} from "../../../styling/StyleComponents";
import { color } from "../../../styling/ColorFontConfig";
import InboxModalPopUp from "../../inbox/InboxModalPopUp";

import EditPostForm from "./EditPostForm";
import SharingPostPrompt from "./SharingPostPrompt";
import { updatePost, deletePost } from '../StreamActions';
import ReactMde from "react-mde";
import Markdown from "react-markdown";

import { retrievePost, createComment } from "./PostActions";

// local styling
var postDividorStyle = {
  ...dividorStyle,
  paddingBottom: "0",
  paddingTop: "0",
}

var buttonOverrideStyle = {
  backgroundColor: "transparent",
  border: "none",
  marginTop: "-2pt",
  height: "20pt",
}

function getDateString(ms) {
  let date = new Date(ms);
  return date.toLocaleDateString();
}

function DetailedPostList(props) {
  // this component seprate a post into three part
  // and put these parts into the list
  // 1. title, description, author, timestamp
  // 2. content (with/without action buttons)
  // 3. comment section

  // liked state, currently only a placeholder, copied from post
  // remenber to udpate this
  const [isLiked, setIsLiked] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [sharingPromptIsOpen, setSharingPromptIsOpen] = useState(false);
  const [writtenComment, setWrittenComment] = useState("");

  // helper functions
  const IsImage = () => {
    if (props.post.contentType === "text/plain") {
      return false;
    }
    else if (props.post.contentType === "text/markdown") {
      return false;
    }
    else {
      return true;
    }
  }

  const IsOwnPost = () => {
    if (props.loggedInAuthor.id === props.post.author.id) {
      console.log("This is your own post");
      return true;
    }
    else {
      console.log("This is a shared post");
      return false;
    }
  }

  const likedToggle = () => {
    isLiked ? setIsLiked(false) : setIsLiked(true)
  }

  const getCategories = (cat) => {
    let categories =  cat.map((c) => <p>#{c}</p>)
    return (
      <Container style={categoriesStyle}>
        {categories}
      </Container>
    )
  }

  const displayCommentEditor = () => {
    return(
      <div>
        <ReactMde
          value={writtenComment}
          onChange={m => setWrittenComment(m)}
        />
        <Button
          style={{ float: "right", marginRight: `-2px` }}
          onClick={e => {
            props.createComment(writtenComment);
            setWrittenComment("");
          }}
        >
        Comment
      </Button>
    </div>
    )
  }

  // const handleCommentSubmit =() => {

  // }

  // 1. title, description, author, timestamp
  const TitleCard = () => {
    return (
      <Card style={{...postStyle, marginTop: "80pt", marginBottom: "0pt"}}>
        <Card.Content style={postContainerStyle}>
          {/* Title */}
          <Container style={signatureStyle}>
          <p style={{ fontWeight: "250" }}>@{props.post.author.displayName}</p>
          <p>·</p>
          <p>{getDateString(Date.parse(props.post.published))}</p>
          </Container>
          <Container style={postTitleStyle}>
          <p style={{textDecoration: "none", color: color.baseBlack}}>{props.post.title}</p>
          </Container>

          {/* Description */}
          <Container style = {DescriptionStyle}>  
            <p>{ props.post.description }</p>
          </Container>

        </Card.Content>
      </Card>
    );
  }


  const displayFooterButtons = () => {
    return (
      <div>
      <Dividor style={postDividorStyle}/>
      <Container style={footerButtonLayoutStyle}>
      <Button style={buttonOverrideStyle} onClick={() => likedToggle()}>
        {isLiked ? <LikedButton/> : <LikeButton/>}
      </Button>
      <Button style={buttonOverrideStyle} onClick={() => setSharingPromptIsOpen(true)}>
        <ShareButton/>
      </Button>
      <Button style={buttonOverrideStyle} onClick={() => setEditModalIsOpen(true)}>
        <EditButton/>
      </Button>
      <Modal className="animate__animated animate__fadeIn animate__faster" show={editModalIsOpen} onClose={() => setEditModalIsOpen(false)} closeOnBlur closeOnEsc>
        <EditPostForm
          setEditModalIsOpen={setEditModalIsOpen}
          post={props.post}
          updatePost={props.updatePost}
          deletePost={props.deletePost}
        />
      </Modal>
      <Modal className="animate__animated animate__fadeIn animate__faster" show={sharingPromptIsOpen} onClose={() => setSharingPromptIsOpen(false)} closeOnBlur closeOnEsc>
        <SharingPostPrompt
          setModalIsOpen={setSharingPromptIsOpen}   
          post={props.post}
          sharePost={props.sharePost}
        />
      </Modal>
    </Container>
    </div>
    );
  }

  const ContentCard = () => {
    return (
      <Card style={postStyle}>
        <Card.Content style={{...postContainerStyle, marginTop: "0.3em"}}>
            
            {/* Content */}
            <Container style = {postContentStyle}>
            {IsImage() ? (
              <Content style={{textAlign: "center"}}>
                <img style={{borderRadius: "6pt"}}src={`data:${props.post.contentType},${props.post.content}`} /> 
              </Content>
            ) : <Content>{props.post.content}</Content> }
            </Container>

            {/* categories */}
            <Container style={postContentStyle}>
              {getCategories(props.post.categories)}
            </Container>
            
            {/* action buttons*/}
            {IsOwnPost()? displayFooterButtons():null}
        </Card.Content>
      </Card>      
    )
  }

  const CommentCard = (CommentList) => {
    // render template of one comment
    const listComment = CommentList.map((comment) =>
      <List.Item>
        <Card style={postStyle}>
          <Card.Content style={postContainerStyle}>
            {/* author and timestamp */}
            <Container style={signatureStyle}>
              <p style={{ fontWeight: "250" }}>@{props.post.author.displayName}</p>
              <p>·</p>
              <p>{getDateString(Date.parse(props.post.published))}</p>
            </Container>
            <Container style={postTitleStyle}>
              <p style={{ color: color.baseBlack }}>Comments</p>
            </Container>
            {/* comment section */}
            <Container style={DescriptionStyle}>
              {comment.comment}
              </Container>
          </Card.Content>
        </Card>
      </List.Item>
    );
    return (
      <List>
        {listComment}
      </List>
    )
  }

  const CommentEditorCard = () => {
    return (
      <Card style={postStyle}>
        <Card.Content style={postContainerStyle}>
          {displayCommentEditor()}
        </Card.Content>
      </Card>
    )
  }

  const CommentList = [{
    comment: "hi",
    contentType: "text/markdown",
    },
    {comment: "hello",
  contentType: "text/markdown"},
  ];                          
  // add comment to this list
  const listItems = [TitleCard(), ContentCard(), CommentCard(CommentList), CommentEditorCard()]    // add component to this list for displaying
  return (
    <div className="post-list animate__animated animate__fadeInDown">
      <List hoverable>{listItems}</List>
    </div>
  )

}

class SelectedPost extends React.Component {

  componentDidMount() {
    const {
      match: { params },
    } = this.props;

    this.props.retrievePost(params.author_id,params.id);
  }

  render() {
      
    if (this.props.loading || !this.props.retrievedPost.author) {
        return (
            <div class="pageloader is-active">
                <span class="title">Loading</span>
            </div>
        );
    }

    return (
        <Section style={pageStyle}>
          <div style={buttonLayerContainerStyle}>
            <Container style={newPostButtonStyle}>
              {/* add floating buttons here, if needed */}
            </Container>
          </div>
          <div style={streamLayerContainerStyle}>
            <Container fluid>
              <Columns centered>
               <DetailedPostList post={this.props.retrievedPost} loggedInAuthor={this.props.loggedInAuthor} comments={this.props.comments} createComment={this.props.createComment} />
              </Columns>
            </Container>
          </div>
        </Section>
    );
  }
}

SelectedPost.propTypes = {
  loggedInAuthor: PropTypes.object.isRequired,
  retrievePost: PropTypes.func.isRequired,
  retrievedPost: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  updatePost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
};

DetailedPostList.propTypes = {
  createComment: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  loading: state.post.loading,
  retrievedPost: state.post.retrievedPost,
  loggedInAuthor: state.auth.author,
});

export default connect(mapStateToProps, { retrievePost, updatePost, deletePost, createComment })(withRouter(SelectedPost));
