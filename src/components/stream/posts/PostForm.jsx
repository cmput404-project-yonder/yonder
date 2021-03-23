import React, { Component } from "react";
import ReactMde from "react-mde";
import { Icon, Form, Button, Panel, Card, Heading } from "react-bulma-components";
import Switch from "bulma-switch";
import Markdown from "react-markdown";
import ReactTags from "react-tag-autocomplete";
import "./react-tags.css";

class PostForm extends Component {
  constructor(props) {
    super(props);

    this.addPost = this.addPost.bind(this);
    this.onAddition = this.onAddition.bind(this);
    this.onDelete = this.onDelete.bind(this);

    this.state = {
      title: "",
      content: "",
      contentType: "",
      description: "",
      unlisted: false,
      visibility: "PUBLIC",
      categories: [],
      selectedTab: "text",
      markdownTab: "write",
      imageObj: "",
      image: "",
    };

    this.reactTags = React.createRef();
  }

  handleFileSelected = event => {
    let file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
    this.setState({
      imageObj: file,
      image: URL.createObjectURL(event.target.files[0]),
    })
  }

  handleReaderLoaded = (readerEvt) => {
    let binaryString = readerEvt.target.result;
    this.setState({
      content: btoa(binaryString),
    })
  }

  handleVisibility = () => {
    if (this.state.visibility === "PUBLIC") {
      this.setState({
        visibility: "PRIVATE",
      });
      console.log(this.state.visibility);
    }
    else if (this.state.visibility === "PRIVATE") {
      this.setState({
        visibility: "PUBLIC",
      });
      console.log(this.state.visibility);

    }
  }

  handleUnlisted = () => {
    this.setState({
      unlisted: !this.state.unlisted,
    });
  };

  onChange = (evt) => {
    const value = evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    this.setState({
      [evt.target.name]: value,
    });
  };

  addPost() {
    console.log(this.state.imageObj);
    const contentType = () => {
      switch (this.state.selectedTab) {
        case "text":
          return "text/plain";
        case "markdown":
          return "text/markdown";
        case "image":
          switch (this.state.imageObj.type) {
            case "image/png":
              return "image/png;base64";
            case "image/jpeg":
              return "image/jpeg;base64";
          }
        default:
          break;
      }
    };
    const categories = this.state.categories.map((cat) => cat.name);
    const newPost = {
      title: this.state.title,
      description: this.state.description,
      content: this.state.content,
      contentType: contentType(),
      unlisted: this.state.unlisted,
      visibility: this.state.visibility,
      categories: categories,
    };
    this.props.createPost(newPost);
    this.props.setModalIsOpen(false);
    console.log(this.state);
    
  }

  selectTab(tab) {
    this.setState({ selectedTab: tab });
  }

  onDelete(i) {
    const categories = this.state.categories.slice(0);
    categories.splice(i, 1);
    this.setState({ categories });
  }

  onAddition(cat) {
    const categories = [].concat(this.state.categories, cat);
    this.setState({ categories });
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

    const imageUploader = () => {
      return (
        <Form.Control>
          <Form.InputFile icon={<Icon icon="upload" />} accept={'image/*'} boxed placeholder="Textarea" style={{ left:`30%`, right:`30%`, marginBottom:`3%` }} onChange={this.handleFileSelected} />
          <img src={this.state.image} style={{ width: `200px`, display: "block", marginLeft: "auto", marginRight: "auto" }} />
        </Form.Control>
      )
    }

    return (
      <Card style={{ borderRadius: "10px", width: "540px" }}>
        <Form.Field style={{ margin: "0 1em", padding: "10px" }}>
          <div style={{ fontWeight: "bold", float:"right", paddingTop:10 }}>
            <label className="checkbox" style={{ float:"right" }}>
              <input type="checkbox" defaultChecked={this.state.unlisted} onChange={this.handleUnlisted} />
                Unlisted
            </label><br></br>
            <div style={{ fontWeight: "bold", float:"right", paddingTop:10 }} className="field" >
              <label htmlFor="switchThinColorDefault">Public </label>
              <input id="switchThinColorDefault" className="switch is-thin" type="checkbox" name="switchThinColorDefault" onChange={this.handleVisibility} />
              <label htmlFor="switchThinColorDefault">Private</label>
            </div>
          </div>
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
        <Form.Field style={{ margin: "0 1em", padding: "10px" }}>
          <Form.Label>Description:</Form.Label>
          <Form.Control>
            <Form.Textarea
              onKeyPress={(e) => {
                if (e.key === "Enter") e.preventDefault();
              }}
              maxLength="30"
              cols={1}
              name="description"
              value={this.state.description}
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

        <Form.Field style={{ margin: "0 1em", padding: "10px" }}>
          <Form.Label>Catgeories:</Form.Label>
          <ReactTags
            allowNew={true}
            ref={this.reactTags}
            tags={this.state.categories}
            onDelete={this.onDelete}
            onAddition={this.onAddition}
          />
        </Form.Field>

        <Form.Field style={{ margin: "0 1em", padding: "10px" }}>
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
            {this.state.selectedTab === "image" ? imageUploader() : null}
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
