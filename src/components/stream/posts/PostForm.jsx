import React, { Component } from "react";
import ReactMde from "react-mde";
import { Form, Button, Panel, Card, Heading, Container } from "react-bulma-components";
import Markdown from "react-markdown";
import ReactTags from "react-tag-autocomplete";
import "./react-tags.css";

import CancelButton from "./CancelButton";
import ConfirmButton from "./ConfirmButton";
import CheckBox from "./CheckBox";


import { TextIcon, ImageIcon, MarkdownIcon } from "./postSVG";
import { color } from "./styling";
import PostTab from "./PostTab";
import Dividor from "./Dividor"


var checkBoxLabelStyle = {
  paddingRight: "0.5em",
  fontWeight: "400",
  fontSize: "1.1em",
  color: color.baseLightGrey,
}

var checkBoxStyle = {
  paddingTop: "1.5em",
  paddingLeft: "1.8em",
  display: "flex",
  float: "left",
  justifyContent: "flex-start"
}

var checkMarkStyle = {
  paddingTop: "0.2em",
  fill: color.baseRed,
}

// used for display info like @author or header
// empty for now
var createPostHeaderStype = {
  display: "flex",
  padding: "0.5em",
}


var cardStyle = {
  borderRadius: "8pt",
  width: "450pt",
  height: "auto",
  boxShadow: "0pt 0pt 12pt #AAAAAA",
  backgroundColor: color.backgroundCream,
}

var panelStyle = {
  display: "flex",
  justifyContent: "between",
  textAlign: "center",
  paddingTop: "0.2em",
  paddingBottom: "0em",
  fontSize: "1.35em",
  fontWeight: "350",
  paddingLeft: "1em",
  paddingRight: "1em",
}

var tabStyle = {
  width: "100%",
}

var submittPanelStyle = {
  margin: "0.5em",
  marginBottom: "0em",
  marginTop: "0em",
  paddingRight: "1.5em",
  paddingLeft: "1.5em",
}

var formContainerStyle = {
  boxShadow: "0pt 0pt 3pt #B1B1B1",
  borderRadius: "8pt",
  marginLeft: "-1.2em",
  marginRight: "-1.2em",
  paddingTop: "1em",
  paddingBottom: "1em",
  paddingRight: "1.5em",
  paddingLeft: "1.5em",
  backgroundColor: color.backgroundGrey,
}

var labelStyle = {
  paddingTop: "0.1em",
  paddingLeft: "0.5em",
  textAlign: "left",
  fontWeight: "400",
  color: color.baseLightGrey,
}

var dividorStyle = {
  marginTop: "1em",
  marginBottom: "0.6em",
}

var formTitleStyle = {
  overflowY: "hidden",
  whiteSpace: "nowrap",
  resize: "none",
  height: "35pt",
}

var buttonLayoutStyle = {
  display: "flex",
  width: "0em",
  float: "right",
  marginRight: "10em",       // the width of two button.
}

var postIconStyle = {
  scale: "70",
  style: {
    padding: "1em",
    fill: color.postIcon,
  }
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
      visibliity: "PUBLIC",
      categories: [],
      selectedTab: "text",
      markdownTab: "write",
    };

    this.reactTags = React.createRef();
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
      visibility: this.state.visibility,
      categories: categories,
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

    const SelectionPanel = () => {
      // custom selection tab
      // text, markdown, image
      return (
        <Container style={panelStyle}>
          <PostTab style={tabStyle}text="Text" active={this.state.selectedTab === "text"} action={() => this.selectTab("text")}/>
          <PostTab style={tabStyle} text="Markdown" active={this.state.selectedTab === "markdown"} action={() => this.selectTab("markdown")}/>
          <PostTab style={tabStyle} text="Image"active={this.state.selectedTab === "image"} action={() => this.selectTab("image")}/>
        </Container>  
      )
    }

    const UnlistCheckBox = () => {
      return (
        <Container style={checkBoxStyle}>
          <p style={checkBoxLabelStyle}>Unlisted</p>
          <CheckBox style={checkMarkStyle} active={this.state.unlisted} action={this.handleUnlisted}/>
        </Container>
      )

    }

     const cancelButtonHandler = () => {
      // exit animation attemps, commented out for now.
      // dont know how to find .modal.is-active.modal-background
      // maybe ill give it another try in part3
      // --- Gengyuan

      // let formCard = document.getElementById("postFormCard");
      // formCard.addEventListener("animationend", () => {this.props.setModalIsOpen(false);})
      // formCard.className = 'animate__animated animate__fadeOutDown'

      this.props.setModalIsOpen(false);
    }

    const PostFormButtonPanel = () => {
      // Confirm and back button used to submit form
      return (
        <Container style={buttonLayoutStyle}>
          <CancelButton action={cancelButtonHandler}/>
          <ConfirmButton action={this.addPost}/>
        </Container>
      )
    }

    const PostSubmitPanel = () => {
      return (
        <Container style={submittPanelStyle}>        
          <UnlistCheckBox/>
          <PostFormButtonPanel/>
        </Container>
      )
    }

    return (
      <Card id="postFormCard" style={cardStyle} className="animate__animated animate__slideInUp">
        <Container style={createPostHeaderStype}>
          <Container style={postIconStyle.style}>{postIcons()}</Container>
        </Container>
        <Container style={formContainerStyle}>
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
          </Form.Field>
          <Form.Field>
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
          </Form.Field>
          <Form.Field>
            <Form.Label style={labelStyle}>Categories</Form.Label>
            <Form.Control>
              <ReactTags
                label=""
                allowNew={true}
                ref={this.reactTags}
                tags={this.state.categories}
                onDelete={this.onDelete}
                onAddition={this.onAddition}
              />
            </Form.Control>
          </Form.Field>
          <Form.Field>
            <Form.Label style={labelStyle}>Content</Form.Label>
            <Form.Control>
              {this.state.selectedTab === "text" ? textEditor() : null}
              {this.state.selectedTab === "markdown" ? markdownEditor() : null}
            </Form.Control>
          </Form.Field>
          <Dividor style={dividorStyle}/>
          <SelectionPanel/>
          <Dividor style={dividorStyle}/>
        </Container>
        <PostSubmitPanel/>
      </Card>
    );
  }
}

export default PostForm;
