import React, { Component } from "react";
import ReactMde from "react-mde";
import { Form, Button, Panel, Card, Heading } from "react-bulma-components";
import Markdown from "react-markdown";

class PostForm extends Component {
  constructor(props) {
    super(props);

    this.addPost = this.addPost.bind(this);

    this.state = {
      posts: [],
      title: "",
      content: "",
      contentType: "",
      description: "",
      unlisted: false,
      visiblity: "PUBLIC",
      categories: [],
      selectedTab: "text",
      markdownTab: "write",
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

  selectTab(tab) {
    this.setState({ selectedTab: tab });
  }

  render() {
    const converter = (markdown) => {
      return <Markdown>{markdown}</Markdown>;
    };

    const textEditor = () => {
      return (
        <Form.Textarea
          name="content"
          value={this.state.content}
          onChange={this.onChange}
          style={{
            height: `245px`,
          }}
        />
      );
    };

    const markdownEditor = () => {
      return (
        <ReactMde
          value={this.state.content}
          onChange={(m) => this.setState({ content: m })}
          selectedTab={this.state.markdownTab}
          onTabChange={(t) => this.setState({ markdownTab: t })}
          generateMarkdownPreview={(markdown) => Promise.resolve(converter(markdown))}
          childProps={{
            writeButton: {
              tabIndex: -1,
            },
          }}
        />
      );
    };

    return (
      <Card style={{ borderRadius: "10px", width: "480px" }}>
        <Form.Field style={{ margin: "1em", padding: "10px" }}>
          <Heading size={4}>Create a Post</Heading>
          <Form.Label>Title:</Form.Label>
          <Form.Control>
            <Form.Textarea
              onKeyPress={(e) => {
                if (e.key === "Enter") e.preventDefault();
              }}
              maxLength="30"
              cols={1}
              name="title"
              value={this.state.title}
              style={{
                overflowY: "hidden",
                whiteSpace: "nowrap",
                resize: "none",
                height: `50px`,
                padding: `10px`,
              }}
              onChange={this.onChange}
            />
          </Form.Control>
        </Form.Field>
        <Form.Field style={{ margin: "1em", padding: "10px" }}>
          <Form.Label>Content:</Form.Label>
          <Panel className="post-editor">
            <Panel.Tabs style={{ marginBottom: `-1em` }}>
              <Panel.Tabs.Tab active={this.state.selectedTab === "text"} onClick={() => this.selectTab("text")}>
                Text
              </Panel.Tabs.Tab>
              <Panel.Tabs.Tab active={this.state.selectedTab === "markdown"} onClick={() => this.selectTab("markdown")}>
                Markdown
              </Panel.Tabs.Tab>
              <Panel.Tabs.Tab active={this.state.selectedTab === "image"} onClick={() => this.selectTab("image")}>
                Image
              </Panel.Tabs.Tab>
            </Panel.Tabs>
          </Panel>
          <Form.Control style={{ textAlign: "right" }}>
            {this.state.selectedTab === "text" ? textEditor() : null}
            {this.state.selectedTab === "markdown" ? markdownEditor() : null}
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
