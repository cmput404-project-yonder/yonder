/*
    props.action - onClick event
*/

import { CancelButton } from "./postSVG";
import { Container } from "react-bulma-components";
import {color} from "../styling";


// local styling
var buttonStyle = {
    scale: "40",
    style: {
        padding: "1.2em",
        fill: color.buttonOrange,
    }
}

// component
function CancelCirButton(props) {

    return (
        <Container style={buttonStyle.style}>
            <a onClick={props.action}><CancelButton svgScale={buttonStyle.scale}/></a>
        </Container>
    );
}

export default CancelCirButton;