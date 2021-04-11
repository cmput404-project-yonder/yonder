/*
    props.action - onClick event
*/

import { PencilIcon } from "./postSVG";
import { Container } from "react-bulma-components";
import {color} from "../styling";


// local styling
var buttonStyle = {
    scale: "21",
    style: {
        fill: color.buttonGreen,
        display: "flex",
        justifyContent: "center",
        gap: "0.5em",

    },
    override: {
        height: "2.5em",
        width: "6em",
        border: "none",
        backgroundColor: "transparent",
        cursor: "pointer",
    },
}

// component
function EditButton(props) {

    return (
        <button type="button" style={buttonStyle.override} onClick={props.action}>
            <Container style={buttonStyle.style}>
                <PencilIcon svgScale={buttonStyle.scale}/>
            </Container>
        </button>
    );
}

export default EditButton;