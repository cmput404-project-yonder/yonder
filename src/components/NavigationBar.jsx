import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Container,Modal} from "react-bulma-components";

import YonderLogo from "./YonderLogo";
import MenuButton from "./MenuButton";
import SearchButton from "./SearchButton";
import LoginStateButton from "./loginStateButton";
import ProfileButton from "./ProfileButton";
import InboxButton from "./InboxButton";
import InboxModal from "./inbox/InboxModal";
import SearchModalView from "./search/SearchModalView";

import { color } from "../styling/ColorFontConfig";

import NaviPollingErrorHandlerComponent from "./NavigationBarErrorHandler";

// reducer actions
import { logout } from "./login/LoginActions";
import { sendFollow } from "../components/profile/ProfileActions";
import { retrieveAllAuthors,clearInbox,retrieveInbox } from "./NavigationActions";


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
  paddingLeft: "2em",
  paddingRight: "2em",
  paddingTop: "1em",
  paddingBottom: "1em",
}

var menuDropDownStyle = {
  borderRadius: "10pt",
  textAlign: "center",
  backgroundColor: color.backgroundCreamLighter,
}

var menuDropDownContentStyle = {
  display: "flex",
  flexDirection: "column",
  marginTop: "0.5em",
  marginBottom: "0.5em",
  gap: "0.9em",
}

var brandStyle = {
  float: "left",
  margin: "auto"
}

var meunButtonStyle = {
  position: "fixed",
  right: "5%",
  marginRight: "-2pt",
}


class NaviPollingComponent extends React.Component {
  constructor(props) {
    super(props);

    // constants
    this.INBOX_POLLING_INTERVAL = 10 * 1000    // 10 seconds
    this.ALLAU_POLLING_INTERVAL = 120 * 1000   // 120 seconds, basically disabled.
    this.WINDO_POLLING_INTERVAL = 5 * 100   // 0.5 seconds, detect window change, should be small, very lightweight, dont worry about performance

    // state
    this.state = {
      inboxPolling: null,
      searchAuthorPolling: null,
      windowsOnChangePolling: null,   // this is used locally, to help navigation bar detect url change within page
      windowsPATH: null,
    }
  }

  onWindowChange = () => {
    // when URL changes

    if (window.location.pathname !== this.state.windowsPATH) {
      this.state.windowsPATH = window.location.pathname;
      this.props.retrieveAllAuthors();
      this.props.retrieveInbox();
    }

    // this function can be used to dynamicly monitor the state of the webpage
    // maybe useful in future
  }

  componentDidMount() {
    // set interval

    // interval
    this.state["inboxPolling"] = setInterval(()=>this.props.retrieveInbox(),this.INBOX_POLLING_INTERVAL);
    this.state["searchAuthorPolling"] = setInterval(()=>this.props.retrieveAllAuthors(), this.ALLAU_POLLING_INTERVAL);
    // this.state["windowsOnChangePolling"] = setInterval(()=>this.onWindowChange(), this.WINDO_POLLING_INTERVAL);
  }

  componentWillUnmount() {
    // clear all interval
    clearInterval(this.state["inboxPolling"]);
    clearInterval(this.state["searchAuthorPolling"]);
    clearInterval(this.state["windowsOnChangePolling"]);
  }

  render() {
    // empty
    // can be used to display a loading icon if needed
    return <span></span>
  }
}


function NavigationBar(props) {

  const retrieveAllAuthorsPolling = () => {
    // if auth is set, send request
    // if not, ignore
    // this function is called by setTimeInterval
    if ((props.auth !== undefined)&&(props.auth.isAuthenticated)) {
      props.retrieveAllAuthors();
    }
  }

  const retrieveInboxPolling = () => {
    // if auth is set, send request
    // this function is called by setTimeInterval
    if ((props.auth !== undefined)&&(props.auth.isAuthenticated)) {
      props.retrieveInbox();
    }
  }

  const loginStateButtonClickHandler=() => {
    if (props.auth.isAuthenticated) {
      props.logout();
    } else {
      window.location.href = '/'
    }
  }

  
  const DropDownContent =()=> {
    // add new entry and logic in this component

    // modal state
    const [inboxModalIsOpen, setInboxModalIsOpen] = useState(false);
    const [searchModalIsOpen, setSearchModalIsOpen] = useState(false);


    let entryList = [];

    if (props.auth.isAuthenticated) {
      // add entry that require authentication here
      entryList.push(<ProfileButton action={() => window.location.href = "/author/" + props.auth.author.id}/>)
      entryList.push(<InboxButton action={() => {setInboxModalIsOpen(true);retrieveInboxPolling();}}/>)   // event triggers a request
      entryList.push(<SearchButton action={() => {setSearchModalIsOpen(true);}}/>)
    } 

    // add entry that only avalible to stranger here, if needed
    // else {}

    // add entry that will always exist here
    
    entryList.push(<LoginStateButton 
      islogin={props.auth.isAuthenticated} 
      action={loginStateButtonClickHandler}
    />)

    return (
      <Container style={menuDropDownContentStyle}>
        {entryList}
      
      {/* add modal here */}
      <Modal className="animate__animated animate__fadeIn animate__faster" show={inboxModalIsOpen} onClose={() => setInboxModalIsOpen(false)} closeOnBlur closeOnEsc>
        <InboxModal setModalIsOpen={setInboxModalIsOpen}/>
      </Modal>
      <Modal className="animate__animated animate__fadeIn animate__faster" show={searchModalIsOpen} onClose={() => setSearchModalIsOpen(false)} closeOnBlur closeOnEsc>
        <SearchModalView setModalIsOpen={setSearchModalIsOpen}/>
      </Modal>
      </Container>
    )
  }

  const DropDown = () => {
    return (
      <div class="dropdown is-hoverable is-right">
        <div class="dropdown-trigger" >
          <MenuButton/>
        </div>
        <div class="dropdown-menu animate__animated animate__fadeIn animate__faster" style={{minWidth: "63pt", marginRight: "-5pt"}}>
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
        <YonderLogo svgScale="70"/>
        </a>
      </Container>
      <Container style={meunButtonStyle}>
        <DropDown/>
      </Container>
      <NaviPollingComponent
        retrieveAllAuthors={retrieveAllAuthorsPolling}
        retrieveInbox={retrieveInboxPolling}
      />
      <NaviPollingErrorHandlerComponent/>
    </div>
  )
}

// notes:
//  - event triggered - when user click on inbox/search button
//  - polling - inbox is updated every 5 seconds (looks good on demo -> update other people's post), 
//        all author are updated every 40 seconds

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  logout, 
  sendFollow, 
  retrieveAllAuthors, 
  clearInbox, 
  retrieveInbox,
})(withRouter(NavigationBar));
