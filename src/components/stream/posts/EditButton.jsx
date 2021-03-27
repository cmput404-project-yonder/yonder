/*
    props.action - onClick event
*/

import { PencilIcon } from "./postSVG";
import { Container } from "react-bulma-components";
import {color} from "./styling";


// local styling
var buttonStyle = {
    scale: "25",
    style: {
        fill: color.buttonGreen,
    }
}

// component
function EditButton(props) {

    return (
        <Container style={buttonStyle.style}>
            <a onClick={props.action}><PencilIcon svgScale={buttonStyle.scale}/></a>
        </Container>
    );
}

export default EditButton;