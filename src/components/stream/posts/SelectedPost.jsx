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

import { retrievePost } from "./PostActions";



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

  // do not delete these lines, will be used in part3 for display comments
  const CommentCard = () => {
    // render template of one comment
    // this function is not planned for part2
    return (
      <Card style={postStyle}>
        <Card.Content style={postContainerStyle}>
          {/* author and timestamp */}
          <Container style={signatureStyle}>
          <p style={{ fontWeight: "250" }}>@{props.post.author.displayName}</p>
          <p>·</p>
          <p>{getDateString(Date.parse(props.post.published))}</p>
          </Container>
          <Container style={postTitleStyle}>
          <p style={{color: color.baseBlack}}>Comment</p>
          </Container>

          {/* comment section */}
          <Container style = {DescriptionStyle}>  
            <p>This is a mockup comment object</p>
          </Container>
          
        </Card.Content>
      </Card>
    )
  }

  const CommentList = []                                 // add comment to this list
  const listItems = [TitleCard(), ContentCard()]    // add component to this list for displaying
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
               <DetailedPostList post={this.props.retrievedPost} loggedInAuthor={this.props.loggedInAuthor}/>
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
};

const mapStateToProps = (state) => ({
  loading: state.post.loading,
  retrievedPost: state.post.retrievedPost,
  loggedInAuthor: state.auth.author,
});

export default connect(mapStateToProps, { retrievePost, updatePost, deletePost })(withRouter(SelectedPost));
