/*
profile edit form

Properties:
    props.displayName - the current displayName of the author
    props.onCancel - cancel button's onClick event handler
*/

import React from "react";
import { Form, Container, Card,List } from "react-bulma-components";
import { ProfileIcon } from "./ProfileIcons";
import { color, font } from "../../styling/ColorFontConfig";

import CancelButton from "../stream/posts/buttons/CancelButton";
import ConfirmButton from "../stream/posts/buttons/ConfirmButton";
import Dividor from "./Dividor";
import { dividorStyle, cardStyle, labelStyle } from "../../styling/StyleComponents";
import { toast } from "react-toastify";
import UnfollowButton from "./buttons/UnfollowButton";
import { InboxEmptyIcon } from "../../styling/svgIcons";

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
  marginTop: "0.3em",

}

var buttonStyle = {
  fontSize: "1.5em",
  color: color.baseLightGrey,
  border: "solid",
  borderRadius: "6pt",
  borderWidth: "1.5pt",
  borderColor: "transparent",
  backgroundColor: "transparent",
  cursor: "pointer",
  height: "1.8em",
}

var buttonSelectedStyle = {
  fontSize: "1.5em",
  color: color.baseRed,
  border: "solid",
  borderRadius: "6pt",
  borderWidth: "1.5pt",
  borderColor: color.baseRed,
  backgroundColor: "transparent",
  cursor: "pointer",
  height: "1.8em",
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

var followerDisplayStyle = {
  height: "40em",
  overflowY: "scroll",
}


class FollowManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0,
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
        <Container style={{...wrapperStyle, margin: "1em", padding: "1em", fontSize: "1.1em", color: "white", backgroundColor: "#D17878"}}>
          <Container style={{float: "right", marginTop: "0.6em", marginRight: "0.5em"}}>
            <UnfollowButton onClick={()=>clickUnfollow(follower)} buttonStyle={{height: "2.8em", width: "2.8em", borderWidth: "1.5pt", borderColor: "white"}} svgStyle={{fill: "white"}} svgScale={25}/>
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
      if (followers.length === 0) {
        return (
          <Container style={{textAlign: "center", marginRight: "1em", marginTop: "40%"}}>
            <Container style={{fill: color.baseLightGrey}}>
              <InboxEmptyIcon svgScale={"80"}/>  
            </Container>
            <p style={{fontSize: "2em", color: color.baseLightGrey}}>Empty</p>
          </Container>
        );
      } else {
        return (
          <List>
            {followersComponentList}
          </List>
        )
      }
    }

    const friendList = () => {
      let friends = this.props.getFriends();
      const friendsComponentList = friends.map(
        (friend) => followerCard(friend)
      );

      if (friends.length === 0) {
        return (
          <Container style={{textAlign: "center", marginRight: "1em", marginTop: "40%"}}>
            <Container style={{fill: color.baseLightGrey}}>
              <InboxEmptyIcon svgScale={"80"}/>  
            </Container>
            <p style={{fontSize: "2em", color: color.baseLightGrey}}>Empty</p>
          </Container>
        );
      } else {
        return (
          <List>
            {friendsComponentList}
          </List>
        )
      }
    }


    return (
      
      <Card style={{...cardStyle, width: "350pt", borderRadius: "9pt", height: "48em"}} className="animate__animated animate__slideInUp">
        <hr style={{...shadowDividorStyle, backgroundColor: "transparent", marginBottom: "0.2em", marginTop: "-1.2em"}}></hr>
        <Container style={followerDisplayStyle} className="hideScroll animate__animated animate__headShake" key={this.state.tab}>
          {(this.state.tab === 0)?followerList():friendList()}
        </Container>
        <hr style={{...shadowDividorStyle, backgroundColor: "transparent", transform: "rotate(180deg)", marginBottom: "-38pt", marginTop: "0.2em"}}></hr>
        <Container style={buttonContainerStyle}>
        
          <button type="button" style={(this.state.tab === 0)?buttonSelectedStyle:buttonStyle} onClick={() => this.setState({tab: 0})}>Followers</button>
          <button type="button" style={(this.state.tab === 1)?buttonSelectedStyle:buttonStyle} onClick={() => this.setState({tab: 1})}>Friends</button>
          
        </Container>

      </Card>
    );
  }
}

export default FollowManager;
