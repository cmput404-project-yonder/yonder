import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Navbar, Container} from "react-bulma-components";

import { logout } from "./login/LoginActions";
import { sendFollow } from "../components/profile/ProfileActions";
import SearchBar from "./SearchBar";

import { Redirect } from "react-router-dom";
import YonderLogo from "./YonderLogo";
import BellIcon from "./BellIcon";
import MenuButton from "./MenuButton";
import SearchButton from "./SearchButton";
import LoginStateButton from "./loginStateButton";
import ProfileButton from "./ProfileButton";
import InboxButton from "./InboxButton";

import { postStyle } from "../styling/StyleComponents";
import { color } from "../styling/ColorFontConfig";



// local stylings
// do not move to ./styling
var naviBarStyle = {
  position: "fixed",
  // display: "flex",
  // justifyContent: "space-between",
  width: "100%",
  height: "auto",
  backgroundColor: "transparent",
  zIndex: "5",
  paddingLeft: "1em",
  paddingRight: "1em",
  paddingTop: "0.5em",
  paddingBottom: "0.5em",
}

var menuDropDownStyle = {
  borderRadius: "6pt",
  textAlign: "center",
  backgroundColor: color.backgroundCreamLighter,
}

var menuDropDownContentStyle = {
  display: "flex",
  flexDirection: "column",
  marginTop: "1em",
  marginBottom: "1em",
  gap: "1em",
}

var brandStyle = {
  float: "left",
  margin: "auto"
}

var meunButtonStyle = {
  float: "right",
  margin: "auto"
}

function NavigationBar(props) {
  const [isActive, setisActive] = useState(false);

  const loginStateButtonClickHandler=() => {
    if (props.auth.isAuthenticated) {
      props.logout();
    } else {
      window.location.href = '/'
    }
  }

  const DropDownContent =()=> {
    // add new entry and logic in this component

    let entryList = [];

    if (props.auth.isAuthenticated) {
      // add entry that require authentication here
      entryList.push(<ProfileButton action={() => window.location.href = "/author/" + props.auth.author.id}/>)
      entryList.push(<InboxButton/>)
    } 

    // add entry that only avalible to stranger here, if needed
    // else {}

    // add entry that will always exist here
    entryList.push(<SearchButton/>)
    entryList.push(<LoginStateButton 
      islogin={props.auth.isAuthenticated} 
      action={loginStateButtonClickHandler}
    />)

    return (
      <Container style={menuDropDownContentStyle}>
        {entryList}
      </Container>
    )
  }

  const DropDown = () => {
    return (
      <div class="dropdown is-hoverable is-right is-active">
        <div class="dropdown-trigger" >
          <MenuButton/>
        </div>
        <div class="dropdown-menu" style={{minWidth: "55pt", marginRight: "-5pt"}}>
          <div class="dropdown-content"style={menuDropDownStyle}>
            <DropDownContent/>
          </div>
        </div>
      </div>      
    )
  }

  return (
    <div style={naviBarStyle}>
      <Container style={brandStyle}>
        <a href = '/'>
        <YonderLogo svgScale="55"/>
        </a>
      </Container>
      <Container style={meunButtonStyle}>
        <DropDown/>
      </Container>
    </div>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  allAuthors: state.stream.allAuthors,
});

export default connect(mapStateToProps, { logout, sendFollow })(withRouter(NavigationBar));
