/*
tab components:
    for selection different editor mode
    
    props.active - boolean, if this tab is active
    props.action - onClick handler
    props.text - text
*/

import React from "react";
import { Container } from "react-bulma-components";
import { color } from "./styling";

// styling

var tabStyle = {
    textDecoration: "none",
}

var activeStyle = Object.assign (
    {}, tabStyle,
    {
        color: color.baseRed,
    }
)

var inactiveStyle = Object.assign (
    {}, tabStyle,
    {
        color: color.baseLightGrey,
    }
)

class PostTab extends React.Component {
    render() {
        return (
            <Container style={this.props.style}>
                <a style={this.props.active ? activeStyle : inactiveStyle}><p onClick={this.props.action}>{this.props.text}</p></a>
            </Container>
        );
    }
}

export default PostTab;