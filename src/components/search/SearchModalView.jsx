import React, { useState, useEffect } from "react";
import { cardStyle, dividorStyle } from "../../styling/StyleComponents";
import { Card, Container } from "react-bulma-components";
import SearchBar from "./SearchBar";
import { withRouter } from "react-router-dom";
import { sendFollow, deleteFollow, checkFollowing } from "../profile/ProfileActions";
import { connect } from "react-redux";

import { SearchAuthorIcon } from "../../styling/svgIcons";
import FollowButton from "./FollowButton";
import UnfollowFollowButton from "./UnfollowButton";
import { color } from "../../styling/ColorFontConfig";


// local styling
// do not move
var searchIconStyle = {
    transform: "rotate(-30deg)",
    width: "3em",
    float: "left",
    marginTop: "-1em",
    marginLeft: "-1em",
    zIndex: "5",
}

var shadowDividorStyle = {
  border:"none",
  width: "105%",
  height: "50px",
  boxShadow:"0 10pt 10pt -15pt rgb(0,0,0,0.3)",
  margin: "-40pt auto -15pt",
  marginLeft: "-1em",
  backgroundColor: "transparent",
}

var searchTitleDivStyle = {
    height: "3em",
}

var searchBarWrapperStyle = {
    marginTop: "2em",
}

var profileCardStyle = {
    padding: "1em",
    paddingBottom: "1.5em",
    borderRadius: "8pt",
    boxShadow: "0pt 0pt 5pt rgb(0,0,0,0.1)",
    width: "80%",
    margin: "auto",
    marginTop: "0.1em",
    marginBottom: "2em",
    backgroundColor: color.backgroundCream,
}


function ProfileCard(props) {
  const[isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (props.author) {
      props.checkFollowing(props.author.id, setIsFollowing);
    }
  }, [props.author])

  const followButton = () => {
    return (
      <FollowButton onClick={()=>props.follow(props.author, ()=> window.location.pathname = window.location.pathname)} style={{float: "right", marginTop: "-8pt", marginRight: "-8pt"}}/>
    )
  }

  const unfollowButton = () => {
    return (
      <UnfollowFollowButton onClick={()=>props.unfollow(props.author, ()=> window.location.pathname = window.location.pathname)} style={{float: "right", marginTop: "-8pt", marginRight: "-8pt"}}/>
    )
  }

  // simplified version of profile card
  if (props.author != null) {
    return (
      <Container>
        <Card style={profileCardStyle} className="animate__animated animate__fadeIn animate__faster">
          {isFollowing ? unfollowButton() : followButton()}
          <p style={{fontSize: "1.6em"}}>@{props.author.displayName}</p>
          
          <p style={{fonrSize: "1.6em"}}>{props.author.id}</p>
          <p style={{fonrSize: "1.6em"}}>{props.author.host}</p>
        </Card> 
        <hr style={{...shadowDividorStyle, marginTop: "-3em", marginBottom: "1em", backgroundColor: "transparent"}}></hr>
      </Container>
    )
  } else {
    return (
      <span></span>
    )
  }
}


function SearchModalView(props) {
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  return (
    <Card style={{...cardStyle, boxShadow: "0pt 0pt 6pt rgb(0,0,0,0.5)", position: "fixed", top: "10%", width: "88%", maxWidth: "47em", paddingBottom: "2.5em", backgroundColor: "#D17878"}} className="animate__animated animate__slideInDown">
      <Container style={searchTitleDivStyle}>
        <Container style= {searchIconStyle}>
          <SearchAuthorIcon svgScale={"55"}/>
        </Container>
      </Container>
      <ProfileCard
        author={selectedAuthor}
        follow={props.sendFollow}
        unfollow={props.deleteFollow}
        checkFollowing={props.checkFollowing}
        isFollowing={props.isFollowing}
      />
      <Container style={searchBarWrapperStyle}>
        <SearchBar authors={props.allAuthors} setAuthor={setSelectedAuthor}/>
      </Container>
    </Card>
  )
}


const mapStateToProps = (state) => ({
  allAuthors: state.navigation.allAuthors,
});

export default connect(mapStateToProps, { sendFollow, deleteFollow, checkFollowing })(withRouter(SearchModalView));
