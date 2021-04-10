import React from "react";
import PropTypes from "prop-types";
import { List,Container,Card } from "react-bulma-components";

import Post from "./Post";
import { color } from "../../../styling/ColorFontConfig";

import { postStyle,postContainerStyle } from "../../../styling/StyleComponents";
import { EmptyFeedIcon } from "../../../styling/svgIcons";

import PopupModal from "./modals/PopupModal";

function PostList(props) {

  props.posts.sort((postA,postB) => Date.parse(postB["published"])-Date.parse(postA["published"]));
  const postList = props.posts.map((post) => <Post interactive={props.interactive} post={post} updatePost={props.updatePost} deletePost={props.deletePost} likePost={props.likePost} sharePost={props.sharePost}/>);

  if (postList.length === 0) {
    return (
      <div className="post-list animate__animated animate__fadeInUp">
        <Card style={{...postStyle, height: "auto", fontSize: "1em"}}>
          <Container>
            <Container style={{textAlign: "center", marginTop: "12em", marginBottom: "9em"}}>
                <Container style={{fill: color.baseLightGrey}}>
                  <EmptyFeedIcon svgScale={"180"}/>  
                </Container>
                <p style={{fontSize: "2.8em", fontWeight: "450", color: color.baseLightGrey}}>Empty feed :(</p>
            </Container>
          </Container>

          <Container style={{textAlign: "center", display: "flex", gap: "1em", marginBottom: "3em"}}>
            <p style={{marginTop: "0.3em",fontSize: "2.2em", fontWeight: "400", color: color.baseLightGrey}}>Click here to create post ></p>
            <PopupModal createPost={props.createPost}/>
          </Container>
        </Card>
      </div>
    );
  } else {
    return (
      <div className="post-list animate__animated animate__fadeInUp">
        <List hoverable>{postList}</List>
      </div>
    );    
  }

}

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
  updatePost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
};

export default PostList;
