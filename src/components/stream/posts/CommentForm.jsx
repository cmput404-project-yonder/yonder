import React from "react";
import { Form, Card, Container } from "react-bulma-components";
import Markdown from "react-markdown";
import ReactMde from "react-mde";
import { cardStyle, formContainerStyle } from "../../../styling/StyleComponents";
import ConfirmButton from "./buttons/ConfirmButton";

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

        return (
            <Card style={cardStyle} className="animate__animated animate__slideInUp">
                <Container style={formContainerStyle}>
                    {markdownEditor()}
                </Container>
                <ConfirmButton action={() => this.props.sendComment(this.state.markDownContent)}/>
            </Card>
        )
    }

}

export default CommentModal;