/*
tab components:
    for selection different editor mode
    
    props.active - boolean, if this tab is active
    props.action - onClick handler
    props.text - text
*/

import React from "react";
import { Container, Button } from "react-bulma-components";
import { color } from "../../../styling/ColorFontConfig";

// styling

var tabStyle = {
    textDecoration: "none",
}

var activeStyle = Object.assign (
    {}, tabStyle,
    {
        color: color.buttonRed,
        border: "solid",
        borderWidth: "1.5pt",
        backgroundColor: "transparent",
        fontSize: "1em",
        height: "1.8em",
    }
)

var inactiveStyle = Object.assign (
    {}, tabStyle,
    {
        color: color.baseLightGrey,
        border: "none",
        backgroundColor: "transparent",
        fontSize: "1em",
        height: "1.8em",
    }
)

class PostTab extends React.Component {
    render() {
        return (
            <Container style={this.props.style}>
                <Button style={this.props.active ? activeStyle : inactiveStyle}><p onClick={this.props.action}>{this.props.text}</p></Button>
            </Container>
        );
    }
}

export default PostTab;