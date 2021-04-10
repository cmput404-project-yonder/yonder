import React, { useState, useEffect } from "react";
import { cardStyle, dividorStyle } from "../../styling/StyleComponents";
import { Card, Container } from "react-bulma-components";
import SearchBar from "./SearchBar";
import { withRouter } from "react-router-dom";
import { sendFollow, deleteFollow, checkFollowing } from "../profile/ProfileActions";
import { connect } from "react-redux";

import { SearchAuthorIcon } from "../../styling/svgIcons";
import Dividor from "../profile/Dividor";
import FollowButton from "./FollowButton";
import DeleteButton from "../stream/posts/buttons/DeleteButton";


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

var searchTitleDivStyle = {
    height: "3em",
}

var searchBarWrapperStyle = {
    marginTop: "2em",
}

var profileCardStyle = {
    padding: "1em",
    borderRadius: "8pt",
    boxShadow: "0pt 0pt 5pt rgb(0,0,0,0.1)",
    width: "80%",
    margin: "auto",
    marginTop: "0.1em",
    marginBottom: "2em",
}


function ProfileCard(props) {

  useEffect(() => {
    if (props.author) {
      props.checkFollowing(props.author.id);
    }
  }, [props.author])

  const followButton = () => {
    return (
      <FollowButton onClick={()=>props.follow(props.author)} style={{float: "right", marginTop: "-8pt", marginRight: "-8pt"}}/>
    )
  }

  const unfollowButton = () => {
    return (
      <DeleteButton action={()=>props.unfollow(props.author)} style={{float: "right", marginTop: "-8pt", marginRight: "-8pt"}}/>
    )
  }

  // simplified version of profile card
  if (props.author != null) {
    return (
      <Container>
        <Card style={profileCardStyle} className="animate__animated animate__fadeIn animate__faster">
          <p style={{fontSize: "1.4em"}}>{props.author.displayName}</p>
          {props.isFollowing ? unfollowButton() : followButton()}
          <Dividor style={dividorStyle}/>
          <p style={{fonrSize: "1.4em"}}>{props.author.id}</p>
        </Card> 
        <Dividor style={{...dividorStyle}}/> 
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
    <Card style={{...cardStyle, minWidth: "18em", maxWidth: "32em", marginTop: "-20%", paddingBottom: "2.5em"}}>
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
  allAuthors: state.stream.allAuthors,
  isFollowing: state.profile.isFollowing,
});

export default connect(mapStateToProps, { sendFollow, deleteFollow, checkFollowing })(withRouter(SearchModalView));
