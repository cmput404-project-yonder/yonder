import React, { Component } from "react";
import ReactMde from "react-mde";
import { Form, Button, Panel, Card, Heading, Container } from "react-bulma-components";
import Markdown from "react-markdown";
import ReactTags from "react-tag-autocomplete";
import "./react-tags.css";

import CancelButton from "./CancelButton";
import ConfirmButton from "./ConfirmButton";

import { TextIcon, ImageIcon, MarkdownIcon } from "./postSVG";
import { color } from "./styling";
import PostTab from "./PostTab";
import Dividor from "./Dividor"

var cardStyle = {
  borderRadius: "8pt",
  width: "380pt",
  height: "auto",
  boxShadow: "0pt 0pt 12pt #AAAAAA",
  backgroundColor: color.backgroundGrey,
}

var panelStyle = {
  display: "flex",
  justifyContent: "between",
  textAlign: "center",
  paddingTop: "0.2em",
  paddingBottom: "0em",
  fontSize: "1.2em",
  fontWeight: "350",
  paddingLeft: "1em",
  paddingRight: "1em",
}

var tabStyle = {
  width: "100%",
}

var formContainerStyle = {
  // boxShadow: "0pt 0pt 3pt #B1B1B1",
  // borderRadius: "3pt",
  margin: "0.5em",
  paddingTop: "1em",
  paddingLeft: "1em",
  paddingRight: "0.5em",
  paddingBottom: "1.5em",
  // backgroundColor: "white",
}

var labelStyle = {
  paddingTop: "0.5em",
  paddingLeft: "0.5em",
  textAlign: "left",
  fontWeight: "400",
  color: color.baseLightGrey,
}

var dividorStyle = {
  marginTop: "1em",
  marginBottom: "0.6em",
  marginLeft: "1.5em",
  marginRight: "1.5em",
}

var formStyle = {
  outline: "none",
  outlineWidth: "0",
}

var formTitleStyle = {
  overflowY: "hidden",
  whiteSpace: "nowrap",
  resize: "none",
  height: `38pt`,
  fontSize: "1.2em",
}

var formContentStyle = {
  height: "160pt",
  fontSize: "1.2em",
}

var buttonLayoutStyle = {
  display: "flex",
  width: "0em",
  float: "right",
  marginRight: "11em",       // the width of two button.
  marginTop: "2em",
}

var postIconStyle = {
  scale: "70",
  style: {
    padding: "1em",
    fill: color.postIcon,
  }
}

var formCatStyle = {
  backgroundColor: "white",
}

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
      visiblity: "PUBLIC",
      categories: [],
      selectedTab: "text",
      markdownTab: "write",
    };

    this.reactTags = React.createRef();
  }

  onChange = (evt) => {
    const value = evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    this.setState({
      [evt.target.name]: value,
    });
  };

  addPost() {
    const author = JSON.parse(localStorage.getItem("author"));
    console.log(author);
    const contentType = () => {
      switch (this.state.selectedTab) {
        case "text":
          return "text/plain";
        case "markdown":
          return "text/markdown";
        case "image":
          //TODO handle image mime type
          break;
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
      visiblity: this.state.visiblity,
      categories: categories,
      author: author.id,
    };
    this.props.createPost(newPost);
    this.props.setModalIsOpen(false);
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
          style={formContentStyle}
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

    const postIcons = () => {
      switch (this.state.selectedTab) {
        case "text":
          return (<TextIcon svgScale={postIconStyle.scale} />)
        case "image":
          return (<ImageIcon svgScale={postIconStyle.scale} />)
        case "markdown":
          return (<MarkdownIcon svgScale={postIconStyle.scale} />)
      }
      
    }

    return (
        <Card style={cardStyle}>
            <Container style={postIconStyle.style}>{postIcons()}</Container>
            <Dividor style={dividorStyle}/>
            <Container style={formContainerStyle}>
            <Container style={formStyle}>
              <Form.Field>
                  <Form.Label style={labelStyle}>Title</Form.Label>
                  <Form.Control>
                      <Form.Textarea
                          onKeyPress={(e) => {if (e.key === "Enter") e.preventDefault();}}
                          maxLength="30"
                          cols={1}
                          name="title"
                          value={this.state.title}
                          style={formTitleStyle}
                          onChange={this.onChange}
                      />
                  </Form.Control>
                  <Form.Label style={labelStyle}>Description</Form.Label>
                  <Form.Control>
                      <Form.Textarea
                          onKeyPress={(e) => {if (e.key === "Enter") e.preventDefault();}}
                          maxLength="30"
                          cols={1}
                          name="description"
                          value={this.state.description}
                          style={formTitleStyle}
                          onChange={this.onChange}
                      />
                  </Form.Control>
                  <Form.Label style={labelStyle}>Categories</Form.Label>
                  <Form.Field style={formCatStyle}>
                    <Form.Control>
                      <ReactTags
                        allowNew={true}
                        ref={this.reactTags}
                        tags={this.state.categories}
                        onDelete={this.onDelete}
                        onAddition={this.onAddition}
                      />
                    </Form.Control>
                  </Form.Field>
                  <Form.Label style={labelStyle}>Content</Form.Label>
                  <Form.Control>
                      {this.state.selectedTab === "text" ? textEditor() : null}
                      {this.state.selectedTab === "markdown" ? markdownEditor() : null}
                  </Form.Control>
              </Form.Field>
            </Container>
            </Container>
            <Dividor style={dividorStyle}/>
              <Container style={panelStyle}>
                <PostTab style={tabStyle}text="Text" active={this.state.selectedTab === "text"} action={() => this.selectTab("text")}/>
                <PostTab style={tabStyle} text="Markdown" active={this.state.selectedTab === "markdown"} action={() => this.selectTab("markdown")}/>
                <PostTab style={tabStyle} text="Image"active={this.state.selectedTab === "image"} action={() => this.selectTab("image")}/>
              </Container>  
            <Container style={buttonLayoutStyle}>
                    <CancelButton action={() => this.props.setModalIsOpen(false)}/>
                    <ConfirmButton action={this.addPost}/>
            </Container>
            <Dividor style={dividorStyle}/>
        </Card>
    );
  }
}

export default PostForm;

