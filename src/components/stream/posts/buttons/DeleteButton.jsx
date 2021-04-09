/*
    props.action - onClick event
*/

import { DeleteIcon } from "./postSVG";
import { Container } from "react-bulma-components";
import {color} from "../styling";


// local styling
var buttonStyle = {
    scale: "40",
    style: {
        padding: "1.2em",
        fill: color.buttonRed,
    }
}

// component
function DeleteButton(props) {

    return (
        <Container style={buttonStyle.style}>
            <a onClick={props.action}><DeleteIcon svgScale={buttonStyle.scale}/></a>
        </Container>
    );
}

export default DeleteButton;