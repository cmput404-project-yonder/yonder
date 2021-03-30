import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Navbar, Heading } from "react-bulma-components";

import { logout } from "./login/LoginActions";
import { sendFollow } from "../components/profile/ProfileActions";
import SearchBar from "./SearchBar";

import YonderLogo from "./YonderLogo";
import ProfileIcon from "./ProfileIcon";
import BellIcon from "./BellIcon";

function NavigationBar(props) {
  const [isActive, setisActive] = useState(false);


  // do not delete these lines
  // const naviBar = () => {
  //   return (
  //     <nav class="navbar" role="navigation" aria-label="main navigation">
  //       <div class="navbar-brand">
  //         <a class="navbar-item" href="https://bulma.io">
  //           <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/>
  //         </a>

  //         <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
  //           <span aria-hidden="true"></span>
  //           <span aria-hidden="true"></span>
  //           <span aria-hidden="true"></span>
  //         </a>
  //       </div>

  //       <div id="navbarBasicExample" class="navbar-menu">
  //         <div class="navbar-start">
  //           <a class="navbar-item">
  //             Home
  //           </a>

  //           <a class="navbar-item">
  //             Documentation
  //           </a>

  //           <div class="navbar-item has-dropdown is-hoverable">
  //             <a class="navbar-link">
  //               More
  //             </a>

  //             <div class="navbar-dropdown">
  //               <a class="navbar-item">
  //                 About
  //               </a>
  //               <a class="navbar-item">
  //                 Jobs
  //               </a>
  //               <a class="navbar-item">
  //                 Contact
  //               </a>
  //               <hr class="navbar-divider"/>
  //               <a class="navbar-item">
  //                 Report an issue
  //               </a>
  //             </div>
  //           </div>
  //         </div>

  //         <div class="navbar-end">
  //           <div class="navbar-item">
  //             <div class="buttons">
  //               <a class="button is-primary">
  //                 <strong>Sign up</strong>
  //               </a>
  //               <a class="button is-light">
  //                 Log in
  //               </a>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </nav>      
  //   )

  // }

  
  const loggedInDropdown = () => {
    return (
      <Navbar.Dropdown>
        <Navbar.Item href={"/author/" + props.auth.author.id}>Profile</Navbar.Item>
        <Navbar.Item onClick={props.logout}>Log out</Navbar.Item>
      </Navbar.Dropdown>
    );
  };

  const loggedOutDropdown = () => {
    return (
      <Navbar.Dropdown right={Boolean("right", false)}>
        <Navbar.Item href="/login/">Login</Navbar.Item>
      </Navbar.Dropdown>
    );
  };

  const notifcationDropdown = () => {
    return (
      <Navbar.Item dropdown hoverable>
        <Navbar.Link arrowless={true}>
          <BellIcon/>
        </Navbar.Link>
        <Navbar.Dropdown>
          <Navbar.Item>
            <b>0</b>&nbsp;Notifications
          </Navbar.Item>
        </Navbar.Dropdown>
      </Navbar.Item>
    );
  };

  return (
    <Navbar color="light" fixed="top" active={isActive}>
      <Navbar.Brand>
        <Navbar.Item renderAs="a" href="/">
          <Heading><YonderLogo svgScale="55"/></Heading>
        </Navbar.Item>
        <Navbar.Burger
          onClick={() => {
            setisActive(!isActive);
          }}
        />
      </Navbar.Brand>
      <Navbar.Container position="end">
        <Navbar.Item>
          <SearchBar authors={props.allAuthors} follow={props.sendFollow}/>
        </Navbar.Item>
        <Navbar.Menu>
          {props.auth.isAuthenticated ? notifcationDropdown() : null}
          <Navbar.Item dropdown hoverable>
            <Navbar.Link arrowless={true}>
              <ProfileIcon/>
            </Navbar.Link>
            {props.auth.isAuthenticated ? loggedInDropdown() : loggedOutDropdown()}
          </Navbar.Item>
        </Navbar.Menu>
      </Navbar.Container>
    </Navbar>
  );

  // return (
  //   <div>
  //   {naviBar()}
  //   </div>
  // )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  allAuthors: state.stream.allAuthors,
});

export default connect(mapStateToProps, { logout, sendFollow })(withRouter(NavigationBar));
