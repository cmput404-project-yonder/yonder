import React from "react";
import { Navbar, Heading, Button } from "react-bulma-components";

import { logout } from "../login/LoginActions";

const colors = {
  Default: "",
  primary: "primary",
  info: "info",
  danger: "danger",
  warning: "warning",
  success: "success",
  white: "white",
  black: "black",
  light: "light",
  dark: "dark",
  link: "link",
};

function NavigationBar() {
  return (
    <Navbar
      color="primary"
      fixed="top"
    >
      <Navbar.Brand>
        <Navbar.Item renderAs="a" href="/">
          <Heading>Yonder</Heading>
        </Navbar.Item>
        <Navbar.Burger />
      </Navbar.Brand>
      <Navbar.Menu>
        <Navbar.Container>
          <Navbar.Item href="/">Home</Navbar.Item>
        </Navbar.Container>
        <Navbar.Container position="end">
          <Navbar.Item>
              <Button color="danger" onClick={logout()}>
                  Logout
              </Button>
          </Navbar.Item>
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>
  );
}

export default NavigationBar;
