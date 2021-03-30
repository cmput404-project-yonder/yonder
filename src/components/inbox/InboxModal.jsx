import React from "react";
import { Card } from "react-bulma-components";
import {color} from "./styling";
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
            </Card>
        )
    }
}


export default InboxModal;