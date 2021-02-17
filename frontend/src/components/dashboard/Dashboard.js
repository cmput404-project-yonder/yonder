import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Container, Navbar, Nav } from "react-bootstrap";
import { logout } from "../login/LoginActions";
import PostForm from "../dashboard/PostForm";


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
          <button onClick={() => this.setState({ showing: !showing })} className="btn btn-success" style={{ float:"left" }} >Create a Post</button>
          <br></br><br></br>{ showing ? <PostForm/> : null }
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
