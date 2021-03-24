import React, { Component } from "react";
import ReactMde from "react-mde";
import { Icon, Form, Button, Panel, Card, Heading, Container } from "react-bulma-components";
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

class EditPostForm extends Component {
  constructor(props) {
    super(props);

    this.editPost = this.editPost.bind(this);
    this.onAddition = this.onAddition.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.removePost = this.removePost.bind(this);

    let categoryTags = this.props.post.categories.map(function(t, i) { 
      return {id: i, name: t}
    })

    this.state = {
      title: this.props.post.title,
      content: this.props.post.content,
      contentType: this.props.post.contentType,
      description: this.props.post.description,
      unlisted: this.props.post.unlisted,
      visibility: this.props.post.visibility,
      categories: categoryTags,
      selectedTab: this.props.post.selectedTab,
      markdownTab: "write",
    };
    console.log(this.state);

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

  editPost() {
    console.log(this.state.unlisted);
    const author = JSON.parse(localStorage.getItem("author"));
    console.log(author);
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
    const editedPost = {
      ...this.props.post,
      title: this.state.title,
      description: this.state.description,
      content: this.state.content,
      contentType: contentType(),
      unlisted: this.state.unlisted,
      visibility: this.state.visibility,
      categories: categories,
    };

    this.props.updatePost(editedPost);
    this.props.setEditModalIsOpen(false);
  }

  removePost() {
    this.props.deletePost(this.props.post)
    this.props.setEditModalIsOpen(false);
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
          <Form.InputFile icon={<Icon icon="upload" />} accept={'image/png', 'image/jpeg'} boxed placeholder="Textarea" style={{ left:`30%`, right:`30%`, marginBottom:`3%` }} onChange={this.handleFileSelected} />
          <img src={ "image/png" ? `data:image/png;base64,${this.state.content}` : `data:image/jpeg;base64,${this.state.content}` } style={{ height: `150px`, display: "block", marginLeft: "auto", marginRight: "auto" }} />
        </Form.Control>
      )
    }

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

    const visibilityCheckBoxTranslator = (visibility) => {
      if (visibility === "PRIVATE"){
        return true;
      } else {
        return false;
      }
      console.log(this.state.visibility);
    }

    const VisibilityCheckBox = () => {
      return (
        <Container style={checkBoxStyle}>
          <p style={checkBoxLabelStyle}>Private Post</p>
          <CheckBox style={checkMarkStyle} active={visibilityCheckBoxTranslator(this.state.visibility)} action={this.handleVisibility}/>
        </Container>
      )
    }

    const PostFormButtonPanel = () => {
      // Confirm and back button used to submit form
      return (
        <Container style={buttonLayoutStyle}>
          <CancelButton action={() => this.props.setEditModalIsOpen(false)}/>
          <ConfirmButton action={this.editPost}/>
          <Button color="danger" onClick={this.removePost}>Delete</Button>
        </Container>
      )
    }

    const PostSubmitPanel = () => {
      return (
        <Container style={submittPanelStyle}>
          <button className="button has-tooltip-info has-tooltip-multiline"
          data-tooltip='Checking the "Private Post" box will only allow the author to view this post. 
                        Checking the "Unlisted" box will allow this post to only show up on the stream of this post author'
          id="helpToolTip"
          style={{ width:40, marginTop:20, float:"left", backgroundColor:"#FF00FF", color:"white", borderRadius:`50%` }} >?</button>
          <VisibilityCheckBox />
          <UnlistCheckBox/>
          <PostFormButtonPanel/>
        </Container>
      )
    }

    return (
      <Card style={cardStyle}>
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
              {this.state.selectedTab === "image" ? imageUploader() : null}
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

export default EditPostForm;
