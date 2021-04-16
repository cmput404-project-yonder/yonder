/*
profile edit form

Properties:
    props.displayName - the current displayName of the author
    props.onCancel - cancel button's onClick event handler
*/

import React from "react";
import { Container, Card,List,Modal } from "react-bulma-components";
import { color, font } from "../../styling/ColorFontConfig";

import { cardStyle, panelStyle, tabStyle } from "../../styling/StyleComponents";
import { InboxEmptyIcon } from "../../styling/svgIcons";

import SearchButton from "./buttons/SearchButton";
import SearchModalView from "../search/SearchModalView";

import PostTab from "../stream/posts/PostTab";
var menuDropDownStyle = {
  borderRadius: "5pt",
  textAlign: "left",
  borderWidth: "1pt",
  padding: "1em",
  border: "1pt solid" + color.baseLightGrey,
  backgroundColor: "white",
  color: color.baseLightGrey,
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

var followerDisplayStyle = {
  height: "46em",
  overflowY: "scroll",
}


class FollowManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0,
      searchModalIsOpen: false,
    }
  }

  render() {
    
    const setSearchModalIsOpen = (state) => {
      this.setState({searchModalIsOpen: state});
    }

    const followerCard = (follower) => {
      // a follower
      return (
        <Container style={{...wrapperStyle, borderRadius: "8pt", margin: "1em", padding: "1em", fontSize: "1.1em", color: "white", backgroundColor: "#D17878"}}>
          <p>@{follower.displayName}</p>
          <p>{follower.id}</p>
          <p>{follower.host}</p>
        </Container>
      )
    }

    const friendCard = (follower) => {
      // a follower
      return (
        <Container style={{...wrapperStyle, borderRadius: "8pt", margin: "1em", padding: "1em", fontSize: "1.1em", color: "white", backgroundColor: "#D17878"}}>
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
        (friend) => friendCard(friend)
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
    const ToolTip = () => {
      return (
        <div class="dropdown is-hoverable is-up is-right" >
          <div class="dropdown-trigger" >
            <span
              style={{backgroundColor: "transparent", border: "none", fill: color.baseRed, padding: "0"}}
            >
            <SearchButton action={() => {setSearchModalIsOpen(true);}}/>
            </span>
          </div>
          <div class="dropdown-menu animate__animated animate__fadeIn animate__faster" style={{minWidth: "250pt", marginBottom: "-8pt"}}>
            <div class="dropdown-content"style={menuDropDownStyle}>
              <p>
                {"Click to search for authors using ID/name. You can follow/unfollow authors from search result"}
              </p>
            </div>
          </div>
        </div> 
      )
    }  

    const SelectionPanel = () => {
      // custom selection tab
      // text, markdown, image
      return (
          <Container style={{...panelStyle, paddingBottom: "0em"}}>
              <PostTab style={tabStyle} text="Followers" active={this.state.tab === 0} action={() => this.setState({tab: 0})}/>
              <PostTab style={tabStyle} text="Friends" active={this.state.tab === 1} action={() => this.setState({tab: 1})}/>
              <div style={{fontSize: "0.65em", marginTop: "0.2em"}}><ToolTip/></div>
          </Container>  
      )
    }



    return (
      <Card style={{...cardStyle, width: "380pt", borderRadius: "12pt", height: "auto", padding: "1em"}} className="animate__animated animate__slideInUp">
        <Card style={{...cardStyle, borderRadius: "9pt", height: "47.5em", backgroundColor: "#FFF8EA", paddingLeft: "1em", paddingRight: "1em", paddingTop: "0.8em"}}>
          <Container style={followerDisplayStyle} className="hideScroll animate__animated animate__headShake" key={this.state.tab}>
            {(this.state.tab === 0)?followerList():friendList()}
          </Container>


        </Card>
        <Container style={{height: "4em", marginTop: "1.4em"}}>
          <SelectionPanel/>
        </Container>
        <Modal className="animate__animated animate__fadeIn animate__faster" show={this.state.searchModalIsOpen} onClose={() => setSearchModalIsOpen(false)} closeOnBlur closeOnEsc>
          <SearchModalView setModalIsOpen={setSearchModalIsOpen}/>
        </Modal>
      </Card>
    );
  }
}

export default FollowManager;
