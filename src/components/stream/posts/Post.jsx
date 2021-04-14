import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bulma-components";
import EditPostForm from "./EditPostForm";
import SharingPostPrompt from "./SharingPostPrompt";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Markdown from "react-markdown";

import { Card, Content, Container } from "react-bulma-components";
import EditButton from "./buttons/EditButton";
import ShareButton from "./buttons/ShareButton";
import LikedButton from "./buttons/LikedButton";
import { DescriptionStyle, categoriesStyle, signatureStyle, postContainerStyle,postTitleStyle, postContentStyle, footerButtonLayoutStyle,postStyle, checkBoxStyle } from "../../../styling/StyleComponents";
import { color } from "./styling";

import { InfoIcon } from "../../../styling/svgIcons";
import { retrievePostLikes } from "./PostActions";
import dateFormat from 'dateformat';

// local styling
var shadowDividorStyle = {
  border:"none",
  width: "105%",
  height: "50px",
  boxShadow:"0 10pt 10pt -15pt rgb(0,0,0,0.3)",
  margin: "-40pt auto -15pt",
  marginLeft: "-1em",
  backgroundColor: color.backgroundCreamLighter,
}

var menuDropDownStyle = {
  borderRadius: "5pt",
  textAlign: "left",
  fontSize: "0.7em",
  padding: "0.7em",
  paddingBottom: "0.9em",
  backgroundColor: "white",
  color: color.baseLightGrey,
  fontWeight: "400",
}

function getDateString(ms) {
  let date = new Date(ms);
  return date.toLocaleDateString();
}

class Post extends React.Component {
  constructor(props) {
    super(props);

    this.likePollingRate = 30;

    this.state = {
      editModalIsOpen: false,
      sharingPromptIsOpen: false,
      likeCount: 0,
      likePolling: null,
    };
  } 

  componentDidMount() {
    this.likePollingCall(this.props.post, this.postLikeSetter);
    this.state["likePolling"] = setInterval(()=>this.likePollingCall(this.props.post, this.postLikeSetter), this.likePollingRate * 1000);
  }

  componentDidUpdate(prevProps) {
    // when post is changed, but compoent is reused
    if (prevProps.post.id !== this.props.post.id) {
      clearInterval(this.state["likePolling"]);
      this.likePollingCall(this.props.post, this.postLikeSetter);
      this.state["likePolling"] = setInterval(()=>this.likePollingCall(this.props.post, this.postLikeSetter), this.likePollingRate * 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.state["likePolling"]);
  }

  // set states
  setEditModalIsOpen = (s) => {
    this.setState({editModalIsOpen: s});
  }
  setSharingPromptIsOpen = (s) => {
    this.setState({sharingPromptIsOpen: s});
  }
  setLikeCount = (s) => {
    if (this.state.likeCount !== s) {
      this.setState({likeCount: s});
    }
  }


  // polling handler
  likePollingCall = (post, setter) => {
    // this function is safe measure (wrapper) for preventing situation where auth is not set, but the webpage is still open
    // polling will only be done if auth is set
    
    if ((this.props.auth !== undefined)&&(this.props.auth.isAuthenticated)&&(this.props.interactive)) {
      this.props.retrievePostLikes(post, setter);
    }
  }

  likePostCall = (post, setter=null) => {
    // same as likePollingCall
    // call this function to like a post
    if ((this.props.auth !== undefined)&&(this.props.auth.isAuthenticated)&&(this.props.interactive)) {
      this.props.likePost(post, setter);
    }
  }

  // helpers
  isImage = () => {
    let isText = (this.props.post.contentType === "text/plain");
    let isMark = (this.props.post.contentType === "text/markdown");
    return ((isText||isMark)?false:true)
  }

  isMarkdown = () => {
    if (this.props.post.contentType === "text/markdown") {
      return (
        <Content>
          <Markdown>
            {this.props.post.content}
          </Markdown>
        </Content>
      )
    }
    else if (this.props.post.contentType === "text/plain") {
      return (
        <Content>
          {this.props.post.content}
        </Content>
      )
    }
  }

  postLikeSetter = (likeList) => {
    this.setLikeCount(likeList.items.length);
  }
  likedToggle = () => {
    // like a post, and trigger a event to retrive likes after backend responded.
    this.likePostCall(this.props.post, () => this.likePollingCall(this.props.post, this.postLikeSetter));
  }
  getCategories = (cat) => {
    // transform a given cat array into component lists for displaying
    // return an components contains strings
    let categories =  cat.map((c) => <p>#{c}</p>)
    return (
      <Container style={categoriesStyle}>
        {categories}
      </Container>
    )
  }

  // sub components
  editButton = () => {
    // edit button
    if (this.props.loggedInAuthor.id == this.props.post.author.id) {
      return  (
        <EditButton action={() => this.setEditModalIsOpen(true)}/>
      );
    }
  }
  displayFooterButtons = () => {
    if (this.props.interactive ){
      return (
        <div>
        <Container style={footerButtonLayoutStyle}>

          {/* buttons */}
          <LikedButton count={this.state.likeCount} action={() => this.likedToggle()}/>
          {this.editButton()}
          <ShareButton action={() => this.setSharingPromptIsOpen(true)}/>
          

          {/* modal */}
          <Modal className="animate__animated animate__fadeIn animate__faster" show={this.state.editModalIsOpen} onClose={() => this.setEditModalIsOpen(false)} closeOnBlur closeOnEsc>
            <EditPostForm
              setEditModalIsOpen={this.setEditModalIsOpen}
              post={this.props.post}
              updatePost={this.props.updatePost}
              deletePost={this.props.deletePost}
            />
          </Modal>
          <Modal className="animate__animated animate__fadeIn animate__faster" show={this.state.sharingPromptIsOpen} onClose={() => this.setSharingPromptIsOpen(false)} closeOnBlur closeOnEsc>
            <SharingPostPrompt
              setModalIsOpen={this.setSharingPromptIsOpen}   
              post={this.props.post}
              sharePost={this.props.sharePost}
            />
          </Modal>
      
      </Container>
      </div>
      );
    }
  }
  render() {




    const TitleWithDropDown = () => {
      // show author id , post id, and displayname
      return (
        <Container style={{width: "100%"}}>
        <div class="dropdown is-hoverable is-right" style={{width: "100%"}} >
          <div class="dropdown-trigger" style={{width: "100%"}}>
            <span
              style={{backgroundColor: "transparent", border: "none", fill: color.baseRed, padding: "0", width: "100%"}}
            >
              
              <Container style={signatureStyle}>
                <p style={{ fontWeight: "250" }}>@{this.props.post.author.displayName}</p>
                <p>·</p>
                <p>{getDateString(Date.parse(this.props.post.published))}</p>
              </Container>

              <a href={"/author/" + this.props.post.author.id + "/posts/" + this.props.post.id + "/"}>
              <Container style={postTitleStyle}>
                <p style={{textDecoration: "none", color: color.baseBlack}}>{this.props.post.title}</p>
              </Container>
              </a>


            </span>
          </div>
          <div class="dropdown-menu animate__animated animate__fadeIn animate__faster" style={{minWidth: "300pt", marginBottom: "6pt", marginLeft: "-10pt"}}>
            <div class="dropdown-content"style={menuDropDownStyle}>
              <Container style={{float: "left", fill: color.baseLightGrey, padding: "0.2em", paddingRight: "1em"}}>
                <InfoIcon svgScale={"60"}/>
              </Container>
              <p>  
                Author ID: {this.props.post.author.id} <br></br>
                Post ID: {this.props.post.id}<br></br>
                {dateFormat(this.props.post.published, "dddd, mmmm dS, yyyy, h:MM TT")}
              </p>
            </div>
          </div>
        </div>    
        </Container>  
      )
    }

    return (
        <Card style={{...postStyle,...this.props.style}} className={(this.props.interactive)?"animate__animated animate__headShake":""} key={this.props.post.title+this.props.post.content+this.props.post.description+this.props.post.author.displayName}>
          <Card.Content style={postContainerStyle}>
            
            
            {/* Title */}
            <TitleWithDropDown/>
            
            {/* Description */}
            <Container style = {DescriptionStyle}>  
              <p>{this.props.post.description }</p>
            </Container>

            <hr style={{...shadowDividorStyle, backgroundColor: "transparent", marginBottom: "0.5em", marginTop: "-32pt"}}></hr>
            
            {/* Content */}
            <Container style = {postContentStyle}>
            {this.isImage() ? (
              <Content style={{textAlign: "center"}}>
                <img style={{borderRadius: "6pt", maxHeight: "500pt"}}src={this.props.post.content} /> 
              </Content>
            ) : this.isMarkdown() }
            </Container>
            
            {/* categories */}
            <Container style={postContentStyle}>
              {this.getCategories(this.props.post.categories)}
            </Container>
            
            {this.displayFooterButtons()}

          </Card.Content>
        </Card>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  updatePost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  retrievePostLikes: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  loggedInAuthor: state.auth.author
});

export default connect(mapStateToProps, {
  retrievePostLikes,
})(withRouter(Post));
