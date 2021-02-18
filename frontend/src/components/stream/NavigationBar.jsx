import React from "react";
import { Navbar, Heading, Button } from "react-bulma-components";

import { logout } from "../login/LoginActions";

function NavigationBar() {
  const [isActive, setisActive] = React.useState(false);

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
          <Navbar.Item dropdown hoverable>
            <Navbar.Link arrowless={true}>
              <span className="typcn typcn-user-outline"></span>
            </Navbar.Link>
            <Navbar.Dropdown>
              <Navbar.Item href="/author/">Profile</Navbar.Item>
              <Navbar.Item onClick={logout()}>Log out</Navbar.Item>
            </Navbar.Dropdown>
          </Navbar.Item>
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>
  );
}

export default NavigationBar;
