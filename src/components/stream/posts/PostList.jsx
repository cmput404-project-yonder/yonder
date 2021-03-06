import React, { useState } from "react";
import PropTypes from "prop-types";
import { List,Container,Card } from "react-bulma-components";

import Post from "./Post";
import { color } from "../../../styling/ColorFontConfig";

import { postStyle } from "../../../styling/StyleComponents";
import { EmptyFeedIcon } from "../../../styling/svgIcons";

import PopupModal from "./modals/PopupModal";

import InBoxPostWrapper from "./InBoxPostWrapper";
import PaginationTag from "./PaginationFlat";



function PostList(props) {
  const [pageNum, setPageNum] = useState(1);
  var pageSize = 6;
  var pageCount = 0;

  props.posts.sort((postA,postB) => Date.parse(postB["published"])-Date.parse(postA["published"]));
  pageCount = props.posts.length;


  let postsSliced = props.posts.slice(pageSize*(pageNum-1), pageSize*(pageNum-1)+pageSize)
  // console.log(pageSize*pageNum);

  if (props.hasInbox !== true) {
    var postList = postsSliced.map((post) => {
      return (
        <Post 
          interactive={props.interactive} 
          post={post} 
          updatePost={props.updatePost} 
          deletePost={props.deletePost} 
          likePost={props.likePost} 
          sharePost={props.sharePost}
        />
      )
    });    
  } else {
    var postList = postsSliced.map((post) => {

      if (props.authorID === post.author.id) {
        return (
          <Post 
            interactive={props.interactive} 
            post={post} 
            updatePost={props.updatePost} 
            deletePost={props.deletePost} 
            likePost={props.likePost} 
            sharePost={props.sharePost}
          />
        )  
      } else {
        return (
          <InBoxPostWrapper
            post={post} 
            interactive={props.interactive}
            updatePost={props.updatePost} 
            deletePost={props.deletePost} 
            likePost={props.likePost} 
            sharePost={props.sharePost}
          />
        )
      }
    }); 
  }




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


  if (props.posts.length === 0) {
    return (
        <Card style={{...postStyle, height: "auto", fontSize: "1em", minWidth: "400pt", marginTop: (props.createPost !== undefined)?"3.5em":"5.7em"}}>
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
      <div>
        <Container style={{fontSize: "1.4em", margin: "0.2em", marginBottom: "-0.2em"}}>
          <PaginationTag
              count={pageCount}
              pageSize={pageSize}
              pageNum={pageNum}
              onClick={(page)=>{setPageNum(page)}}
              primaryColor={color.baseLightGrey}
              secondaryColor={color.backgroundGrey}
            />
        </Container>
          <div class="animate__animated animate__fadeIn animate__fast" key={pageNum}>
          <List style={{minWidth: "400pt"}} hoverable>
          {postList}
          </List>
          </div>
        <Container style={{fontSize: "1.4em", margin: "0.2em", marginTop: "1em"}}>
          <PaginationTag
              count={pageCount}
              pageSize={pageSize}
              pageNum={pageNum}
              onClick={(page)=>{setPageNum(page)}}
              primaryColor={color.baseLightGrey}
              secondaryColor={color.backgroundGrey}
            />
        </Container>
      </div>
    );    
  }

}

export default PostList;


