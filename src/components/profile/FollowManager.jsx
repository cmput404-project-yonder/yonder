/*
profile edit form

Properties:
    props.displayName - the current displayName of the author
    props.onCancel - cancel button's onClick event handler
*/

import React from "react";
import { Form, Container, Card,List } from "react-bulma-components";
import { ProfileIcon } from "./ProfileIcons";
import { color, font } from "./styling";

import CancelButton from "../stream/posts/buttons/CancelButton";
import ConfirmButton from "../stream/posts/buttons/ConfirmButton";
import Dividor from "./Dividor";
import { dividorStyle, cardStyle, labelStyle } from "../../styling/StyleComponents";
import { toast } from "react-toastify";
import UnfollowButton from "./buttons/UnfollowButton";

const formContainerStyle = {
  borderRadius: "8pt",
  marginLeft: "1.2em",
  marginRight: "1.2em",
  paddingTop: "0em",
  paddingBottom: "0em",
  paddingRight: "0.5em",
  paddingLeft: "0.5em",
  backgroundColor: "white",
  boxShadow: "0pt 0pt 6pt rgb(0,0,0,0.1)",
}

var wrapperStyle = {
  marginLeft: "0.6em",
  marginRight: "0.6em",
  marginBottom: "0.2em",
  boxShadow: "0pt 0pt 6pt rgb(0,0,0,0.1)",
  borderRadius: "10pt",
  backgroundColor: "white",
  zIndex: "1",
}

var buttonContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  width: "70%",

}

var buttonStyle = {
  fontSize: "1.5em",
  color: color.baseLightGrey,
  borderRadius: "6pt",
  borderWidth: "1.5pt",
  border: "solid",
  borderColor: "transparent",
  padding: "0.3em",
  backgroundColor: "transparent",
  cursor: "pointer",
}

var buttonSelectedStyle = {
  fontSize: "1.5em",
  color: color.baseRed,
  borderRadius: "6pt",
  borderWidth: "1.5pt",
  border: "solid",
  borderColor: color.baseRed,
  padding: "0.3em",
  backgroundColor: "transparent",
  cursor: "pointer",
}

var shadowDividorStyle = {
  border:"none",
  width: "105%",
  height: "50px",
  boxShadow:"0 10pt 10pt -15pt rgb(0,0,0,0.3)",
  margin: "-40pt auto -15pt",
  marginLeft: "-1em",
  backgroundColor: color.backgroundCreamLighter,
}

var followerDisplayStyle = {
  height: "310pt",
  overflowY: "scroll",
}


class FollowManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 1,
    }
  }

  render() {
    
    // console.log(this.props.getFollowers());
    // console.log(this.props.getFriends());
    const clickUnfollow = (authorID) => {
      this.props.deleteFollow(authorID);
    }


    const followerCard = (follower) => {
      // a follower
      return (
        <Container style={{...wrapperStyle, margin: "1em", marginBottom: "0.6em", padding: "1em", fontSize: "1.1em", color: color.baseGreyHard}}>
          <Container style={{float: "right", marginTop: "0.6em", marginRight: "0.5em"}}>
            <UnfollowButton onClick={()=>clickUnfollow(follower)} buttonStyle={{height: "2.5em", width: "2.5em", borderWidth: "1.5pt"}} svgScale={20}/>
          </Container>
          <p>@{follower.displayName}</p>
          <p>{follower.id}</p>
          <p>{follower.host}</p>
        </Container>
      )
    }

    const followerList = () => {
      let followers = this.props.getFollowers();
      const followersComponentList = followers.map(
        (follower) => followerCard(follower)
      );

      return (
        <List>
          {followersComponentList}
        </List>
      )
    }

    const friendList = () => {
      let friends = this.props.getFriends();
      const friendsComponentList = friends.map(
        (friend) => followerCard(friend)
      );

      console.log(friends);

      return (
        <List>
          {friendsComponentList}
        </List>
      )
    }


    return (
      
      <Card style={{...cardStyle, width: "360pt", borderRadius: "12pt", height: "380pt"}} className="animate__animated animate__slideInUp">
        <hr style={{...shadowDividorStyle, backgroundColor: "transparent", marginBottom: "0.3em", marginTop: "-20pt"}}></hr>
        <Container style={followerDisplayStyle} className="hideScroll">
          {(this.state.tab === 0)?followerList():friendList()}
        </Container>
        <hr style={{...shadowDividorStyle, backgroundColor: "transparent", transform: "rotate(180deg)", marginBottom: "-38pt", marginTop: "0.3em"}}></hr>
        <Container style={buttonContainerStyle}>
        
          <button type="button" style={(this.state.tab === 0)?buttonSelectedStyle:buttonStyle} onClick={() => this.setState({tab: 0})}>Followers</button>
          <button type="button" style={(this.state.tab === 1)?buttonSelectedStyle:buttonStyle} onClick={() => this.setState({tab: 1})}>Friends</button>
          
        </Container>

      </Card>
    );
  }
}

export default FollowManager;
