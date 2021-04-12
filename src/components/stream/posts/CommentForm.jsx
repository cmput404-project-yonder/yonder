import React from "react";
import { Form, Card, Container } from "react-bulma-components";
import Markdown from "react-markdown";
import ReactMde from "react-mde";
import { toast } from "react-toastify";
import { color } from "../../../styling/ColorFontConfig";
import { buttonLayoutStyle, cardStyle, formContainerStyle, labelStyle, submittPanelStyle } from "../../../styling/StyleComponents";
import ConfirmButton from "./buttons/ConfirmButton";


var shadowDividorStyle = {
    border:"none",
    width: "105%",
    height: "50px",
    boxShadow:"0 10pt 10pt -15pt rgb(0,0,0,0.3)",
    margin: "-40pt auto -15pt",
    marginLeft: "-1em",
    backgroundColor: color.backgroundCreamLighter,
}

var confirmButtonStyle = {
    textAlign: "Right",
    marginTop: "-1.2em",
    marginBottom: "-0.5em",
    marginRight: "0.8em",
}

class CommentModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markDownContent: "",
            markdownTab: "write",
        }
    }

    render() {
        const converter = (markdown) => {
            return <Markdown>{markdown}</Markdown>;
        };

        const markdownEditor = () => {
            return (
                <ReactMde
                  value={this.state.markDownContent}
                  onChange={(m) => this.setState({ markDownContent: m })}
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
        }

        const submitComment = () => {
            if (this.state.markDownContent !== "") {
                this.props.sendComment(this.state.markDownContent)
            } else {
                toast.error("Comment cannot be empty");
            }
        }

        return (
            <Card style={{...cardStyle, maxWidth: "440pt", borderRadius: "16pt"}} className="animate__animated animate__slideInUp">

                <Container style={{...formContainerStyle, margin: "1em", marginBottom: "0.2em", paddingBottom: "1.8em", borderRadius: "8pt"}}>
                <Form.Label style={{...labelStyle, marginTop: "-0.4em"}}>Comment <span style={{color: color.baseRed}}>*</span></Form.Label>
                    {markdownEditor()}

                </Container>
                <hr style={{...shadowDividorStyle, backgroundColor: "transparent", marginBottom: "10pt", marginTop: "-32pt"}}></hr>
                <Container style={confirmButtonStyle}>
                    <ConfirmButton action={() => submitComment()}/>
                </Container>
                
            </Card>
        )
    }

}

export default CommentModal;