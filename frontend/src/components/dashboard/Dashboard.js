import React, { Component } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Container, Navbar, Nav, Button, ModalBody, ModalTitle } from "react-bootstrap";
import { logout } from "../login/LoginActions";
import PostForm from "./posts/PostForm";
import PopupModal from "./posts/PopupModal";

class Dashboard extends Component {

  onLogout = () => {
    this.props.logout();
  };

  state = { showing: false };


  render() {
    const { user } = this.props.auth;
    const { showing } = this.state;
    
    return (
      <div>
        <Navbar variant="light" style={{backgroundColor: '#E6E6FA'}}>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              User: <b>{user.username}</b>
            </Navbar.Text>
            <Nav.Link onClick={this.onLogout}>Logout</Nav.Link>
          </Navbar.Collapse>
        </Navbar>
        <Container style={{position: 'absolute', left: 10}}>
          <h1>Dashboard</h1>
          <div>
            <PopupModal/>
          </div>
          <br></br><br></br>
        </Container>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  logout
})(withRouter(Dashboard));
