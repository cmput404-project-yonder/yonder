import React, { Component } from "react";
import MarkDown from "react-markdown";
import { Form, Button, Panel, Card, Heading } from "react-bulma-components";

import { Post } from "../../../models/index";

class PostForm extends Component {
  constructor(props) {
    super(props);

    this.addPost = this.addPost.bind(this);

    this.state = {
      posts: [],
      newPost: Post,
    };
  }

  onChange = (evt) => {
    const value = evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    this.setState({
      [evt.target.name]: value,
    });
  };

  addPost() {
    this.props.setModalIsOpen(false);
  }

  render() {
    return (
      <Card style={{ borderRadius: "10px", maxWidth: "640px" }}>
        <Form.Field style={{ margin: "1em" }}>
          <Heading size={4}>Create a Post</Heading>
          <Form.Label>Title:</Form.Label>
          <Form.Textarea
            onKeyPress={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }}
            maxLength="30"
            cols={1}
            value={this.state.newPost.title}
            id="textHeader"
            style={{
              overflowY: "hidden",
              whiteSpace: "nowrap",
              resize: "none",
              width: window.innerWidth / 1.07,
              height: `50px`,
              padding: `10px`,
            }}
            onChange={this.onChange}
          />

          <Form.Label>Content:</Form.Label>
          <Panel className="post-editor">
            <Panel.Tabs>
              <Panel.Tabs.Tab active>Text</Panel.Tabs.Tab>
              <Panel.Tabs.Tab>Markdown</Panel.Tabs.Tab>
              <Panel.Tabs.Tab>Image</Panel.Tabs.Tab>
            </Panel.Tabs>
          </Panel>
          <Form.Textarea
            id="textBody"
            value={this.state.newPost.content}
            onChange={this.onChange}
            style={{
              width: window.innerWidth / 1.07,
              height: `360px`,
              padding: `20px`,
              marginTop: `-1em`,
            }}
          />
          <Form.Control style={{ textAlign: "right" }}>
            <Button color="danger" onClick={() => this.props.setModalIsOpen(false)}>
              Cancel
            </Button>
            <Button color="success" onClick={this.addPost}>
              Post
            </Button>
          </Form.Control>
        </Form.Field>
      </Card>
    );
  }
}

export default PostForm;
