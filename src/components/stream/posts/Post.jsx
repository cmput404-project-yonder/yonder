import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bulma-components";
import EditPostForm from "./EditPostForm";
import SharingPostPrompt from "./SharingPostPrompt";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Card, Content, Container, Button } from "react-bulma-components";
import Dividor from "./Dividor";
import { Link } from "react-router-dom";
import EditButton from "./EditButton";
import ShareButton from "./ShareButton";
import LikeButton from "./LikeButton";
import LikedButton from "./LikedButton";
import { DescriptionStyle, dividorStyle, postStyle, categoriesStyle, signatureStyle, postContainerStyle,postTitleStyle, postContentStyle, footerButtonLayoutStyle } from "../../../styling/StyleComponents";
import { color } from "./styling";
// import { connectAdvanced } from "react-redux";

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



function Post(props) {
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [sharingPromptIsOpen, setSharingPromptIsOpen] = useState(false);
  // console.log(props.post);
  
  const postURL = "/author/" + props.post.author.id + "/posts/" + props.post.id + "/";

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

  const likedToggle = () => {
    isLiked ? setIsLiked(false) : setIsLiked(true)
    props.likePost(props.post);
  }

  const getCategories = (cat) => {
    let categories =  cat.map((c) => <p>#{c}</p>)
    return (
      <Container style={categoriesStyle}>
        {categories}
      </Container>
    )
  }

  const editButton = () => {
    if (props.loggedInAuthor.id == props.post.author.id) {
      return  (
      <Button style={buttonOverrideStyle} onClick={() => setEditModalIsOpen(true)}>
        <EditButton/>
      </Button>
      );
    }
  }

  const displayFooterButtons = () => {
    if (props.interactive ){
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
        {editButton()}
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
  }

  return (
      <Card style={{...postStyle,...props.style}}>
        <Card.Content style={postContainerStyle}>

          {/* Title */}
          <Container style={signatureStyle}>
          <p style={{ fontWeight: "250" }}>@{props.post.author.displayName}</p>
          <p>·</p>
          <p>{getDateString(Date.parse(props.post.published))}</p>
          </Container>
          <Container style={postTitleStyle}>
          <Link to={`${postURL}`} style={{textDecoration: "none", color: color.baseBlack}}>{props.post.title}</Link>
          </Container>
          
          {/* Description */}
          <Container style = {DescriptionStyle}>  
            <p>{ props.post.description }</p>
          </Container>

          <Dividor style={postDividorStyle}/>
          
          {/* Content */}
          <Container style = {postContentStyle}>
          {IsImage() ? (
            <Content style={{textAlign: "center"}}>
              <img style={{borderRadius: "6pt", maxHeight: "300pt"}}src={`data:${props.post.contentType},${props.post.content}`} /> 
            </Content>
          ) : <Content>{props.post.content}</Content> }
          </Container>
          
          {/* categories */}
          <Container style={postContentStyle}>
            {getCategories(props.post.categories)}
          </Container>
          
          {displayFooterButtons()}

        </Card.Content>
      </Card>
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  updatePost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loggedInAuthor: state.auth.author
});

export default connect(mapStateToProps, {
})(withRouter(Post));
