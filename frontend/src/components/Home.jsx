import React, { Component } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Container, Heading, Section } from "react-bulma-components";

class Home extends Component {
  render() {
    if (this.props.auth.isAuthenticated) {
      return <Redirect to="/stream" />;
    }

    return (
      <Section>
        <Container fluid>
          <Heading>Home</Heading>
          <p>
            <Link to="/login/">Login</Link>
          </p>
          <p>
            <Link to="/signup">Sign up</Link>
          </p>
          <p>
            <Link to="/stream">Stream</Link>
          </p>
        </Container>
      </Section>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(withRouter(Home));
