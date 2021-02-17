import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Heading, Section } from "react-bulma-components";

class Home extends Component {
  render() {
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

export default Home;
