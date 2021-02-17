import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Container, Columns, Heading, Section } from "react-bulma-components";
import { logout } from "../login/LoginActions";

import PostList from "./PostList";
import NavigationBar from "./NavigationBar" ;

class Stream extends Component {
  onLogout = () => {
    this.props.logout();
  };
  retreivePosts = (author) => {
    this.props.getAllPosts(author.id);
  };

  render() {
    // const { author } = this.props.author;
    const author = {
      id: "1",
      display_name: "Mark Twain",
      host: "localhost",
      url: "localhost/1",
      github: "",
    };
    const posts = [
      {
        title: "The Adventures of Huckleberry Finn",
        description: "A story set in a nineteenth-century Mississippi River town",
        content: " A nineteenth-century boy from a Mississippi River town recounts his adventures as he travels down the river with a runaway slave, encountering a family involved in a feud, two scoundrels pretending to be royalty, and Tom Sawyer's aunt who mistakes him for Tom"
      }
    ]
    return (
      <Section>
        <Heading size={3}>Welcome to your stream {author.display_name}</Heading>
        <Container fluid>
          <NavigationBar />
          <Columns centered>
            <Columns.Column size={6}>
              <PostList posts={posts} />
            </Columns.Column>
          </Columns>
        </Container>
      </Section>
    );
  }
}

// Stream.propTypes = {
//   logout: PropTypes.func.isRequired,
//   author: PropTypes.object.isRequired
// };

const mapStateToProps = (state) => ({
  author: state.author,
});

export default connect(mapStateToProps, {
  logout,
})(withRouter(Stream));
