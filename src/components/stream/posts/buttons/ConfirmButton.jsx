/*
    props.action - onClick event
*/

import { ConfirmButton } from "./postSVG";
import { Container } from "react-bulma-components";
import {color} from "../styling";


// local styling
var buttonStyle = {
    scale: "40",
    style: {
        padding: "1.2em",
        fill: color.buttonGreen,
    }
}

// component
function ConfirmCirButton(props) {

    return (
        <Container style={buttonStyle.style}>
            <a onClick={props.action}><ConfirmButton svgScale={buttonStyle.scale}/></a>
        </Container>
    );
}

export default ConfirmCirButton;