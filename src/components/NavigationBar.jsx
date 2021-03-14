import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Navbar, Heading } from "react-bulma-components";

import { logout } from "./login/LoginActions";

function NavigationBar(props) {
  const [isActive, setisActive] = React.useState(false);

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
          <span className="typcn typcn-bell"></span>
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
          <Heading>Yonder</Heading>
        </Navbar.Item>
        <Navbar.Burger
          onClick={() => {
            setisActive(!isActive);
          }}
        />
      </Navbar.Brand>
      <Navbar.Menu>
        <Navbar.Container position="end">
          {props.auth.isAuthenticated ? notifcationDropdown() : null}
          <Navbar.Item dropdown hoverable>
            <Navbar.Link arrowless={true}>
              <span className="typcn typcn-user-outline"></span>
            </Navbar.Link>
            {props.auth.isAuthenticated ? loggedInDropdown() : loggedOutDropdown()}
          </Navbar.Item>
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  logout,
})(withRouter(NavigationBar));
