import React from "react";
import { Card } from "react-bulma-components";
import { color } from "./styling";
import Inbox from "./Inbox";


const inboxPageStyle = {
    borderRadius: "8pt",
    maxWidth: "1000pt",
    minWidth: "700pt",
    maxHeight: "800pt",
    minHeight: "500pt",
    boxShadow: "0pt 0pt 8pt rgb(0,0,0,0.5)",
    backgroundColor: color.backgroundCream,
}

class InboxModal extends React.Component {
    render() {
        return (
            <Card style={inboxPageStyle} >
                <Card.Header>
                    <Card.Header.Title>
                        Your Inbox
                    </Card.Header.Title>
                </Card.Header>
                <Card.Content>
                   <Inbox /> 
                </Card.Content>
            </Card>
        )
    }
}


export default InboxModal;