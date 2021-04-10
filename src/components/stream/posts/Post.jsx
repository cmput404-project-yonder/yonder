import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bulma-components";
import EditPostForm from "./EditPostForm";
import SharingPostPrompt from "./SharingPostPrompt";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Card, Content, Container, Button } from "react-bulma-components";
import Dividor from "./Dividor";
import EditButton from "./buttons/EditButton";
import ShareButton from "./buttons/ShareButton";
import LikedButton from "./buttons/LikedButton";
import { DescriptionStyle, postStyle, categoriesStyle, signatureStyle, postContainerStyle,postTitleStyle, postContentStyle, footerButtonLayoutStyle } from "../../../styling/StyleComponents";
import { color } from "./styling";
// import { connectAdvanced } from "react-redux";

import { retrievePostLikes } from "./PostActions";


// local styling
var postDividorStyle = {
  paddingTop: "0.4em",
  paddingBottom: "0.2em",
  marginLeft: "0.4em",
  marginRight: "0.4em",
}

function getDateString(ms) {
  let date = new Date(ms);
  return date.toLocaleDateString();
}



function Post(props) {
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [sharingPromptIsOpen, setSharingPromptIsOpen] = useState(false);
  const [likeCount, setLikeCount] = useState(-1);
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


  const postLikeSetter = (likeList) => {
    
    console.log("setter is called");
    
    
    setLikeCount(likeList.items.length);
  }

  const likedToggle = () => {
    props.retrievePostLikes(props.post, postLikeSetter);
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
        <EditButton action={() => setEditModalIsOpen(true)}/>
      );
    }
  }

  const displayFooterButtons = () => {
    if (props.interactive ){
      return (
        <div>
        <Container style={footerButtonLayoutStyle}>

          {/* buttons */}
          <LikedButton count={likeCount} action={() => likedToggle()}/>
          <ShareButton action={() => setSharingPromptIsOpen(true)}/>
          {editButton()}

          {/* modal */}
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
          <a href={postURL}>
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

          <Dividor style={postDividorStyle}/>
          </a>
          
          {/* Content */}
          <Container style = {postContentStyle}>
          {IsImage() ? (
            <Content style={{textAlign: "center"}}>
              <img style={{borderRadius: "6pt", maxHeight: "500pt"}}src={`data:${props.post.contentType},${props.post.content}`} /> 
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
  retrievePostLikes: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loggedInAuthor: state.auth.author
});

export default connect(mapStateToProps, {
  retrievePostLikes,
})(withRouter(Post));
