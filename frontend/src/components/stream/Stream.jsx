import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Container, Columns, Section } from "react-bulma-components";

import { logout } from "../login/LoginActions";
import PostList from "./PostList";
import PopupModal from "./posts/PopupModal";

class Stream extends Component {
  onLogout = () => {
    this.props.logout();
  };
  retreivePosts = (author) => {
    this.props.getAllPosts(author.id);
  };

  render() {
    // const { author } = this.props.author;
    const posts = [
      {
        title: "The Adventures of Huckleberry Finn",
        description: "A story set in a nineteenth-century Mississippi River town",
        content:
          " A nineteenth-century boy from a Mississippi River town recounts his adventures as he travels down the river with a runaway slave, encountering a family involved in a feud, two scoundrels pretending to be royalty, and Tom Sawyer's aunt who mistakes him for Tom",
      },
    ];
    return (
      <Section>
        <Container fluid>
          <PopupModal />
          <Columns centered>
            <Columns.Column>
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
