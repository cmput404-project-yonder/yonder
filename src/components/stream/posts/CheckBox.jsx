/*
props.action: onClick handler
props.active: booleam value -> true -> box is checked, false -> box is unchecked
*/

import React from "react";
import { Container } from "react-bulma-components";
import { CheckBoxChecked, CheckBoxUnchecked } from "./postSVG";
import { color } from "./styling";

// local styling
var buttonStyle = {
    scale: "15",
}


class CheckBox extends React.Component {
    render() {
        const Checked = () => {
            return (
                <CheckBoxChecked svgScale={buttonStyle.scale}/>
            )
        }

        const Unchecked = () => {
            return (
                <CheckBoxUnchecked svgScale={buttonStyle.scale}/>
            )

        }

        return (
            <Container style={this.props.style}>
                <a onClick={this.props.action}>{this.props.active ? Checked() : Unchecked()}</a>
            </Container>
        );
    }
}

export default CheckBox;