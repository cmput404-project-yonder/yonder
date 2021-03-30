/*
    props.action - onClick event
*/

import { SharingIcon } from "./postSVG";
import { Container } from "react-bulma-components";
import {color} from "./styling";


// local styling
var buttonStyle = {
    scale: "20",
    style: {
        fill: color.buttonOrange,
    }
}

// component
function ShareButton(props) {

    return (
        <Container style={buttonStyle.style}>
            <a onClick={props.action}><SharingIcon svgScale={buttonStyle.scale}/></a>
        </Container>
    );
}

export default ShareButton;