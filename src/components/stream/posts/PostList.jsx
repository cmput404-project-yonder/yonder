import React from "react";
import PropTypes from "prop-types";
import { List,Container,Card } from "react-bulma-components";

import Post from "./Post";
import { color } from "../../../styling/ColorFontConfig";

import { postStyle } from "../../../styling/StyleComponents";
import { EmptyFeedIcon } from "../../../styling/svgIcons";

import PopupModal from "./modals/PopupModal";
import { connect } from "react-redux";

function PostList(props) {
  
  props.posts.sort((postA,postB) => Date.parse(postB["published"])-Date.parse(postA["published"]));
  const postList = props.posts.map((post) => <Post interactive={props.interactive} post={post} updatePost={props.updatePost} deletePost={props.deletePost} likePost={props.likePost} sharePost={props.sharePost}/>);

  const createNewPostGuide = () => {
    if (props.createPost !== undefined) {
      return (
        <Container style={{textAlign: "center", display: "flex", gap: "1em", marginBottom: "3em"}}>
          <p style={{marginTop: "0.3em",fontSize: "1.9em", fontWeight: "400", color: color.baseLightGrey}}>click to start</p>
          <PopupModal isFlat={true} createPost={props.createPost}/>
        </Container>        
      )
    }
  }


  if (postList.length === 0) {
    return (
        <Card style={{...postStyle, height: "auto", fontSize: "1em", minWidth: "400pt"}}>
          <Container>
            <Container style={{textAlign: "center", marginTop: "12em", marginBottom: "9em"}}>
                <Container style={{fill: color.baseLightGrey}}>
                  <EmptyFeedIcon svgScale={"180"}/>  
                </Container>
                <p style={{fontSize: "2.8em", fontWeight: "450", color: color.baseLightGrey}}>Empty feed :(</p>
            </Container>
          </Container>
          {createNewPostGuide()}

        </Card>
    );
  } else {
    return (
        <List style={{minWidth: "400pt"}} hoverable>
          {postList}
        </List>
    );    
  }

}

export default PostList;


