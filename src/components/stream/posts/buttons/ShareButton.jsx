/*
    props.action - onClick event
*/

import { SharingIcon } from "./postSVG";
import { Container } from "react-bulma-components";
import { color } from "../../../../styling/ColorFontConfig";


// local styling
var buttonStyle = {
    scale: "22",
    style: {
        fill: color.buttonOrange,
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
function ShareButton(props) {

    return (
        <button type="button" style={buttonStyle.override} onClick={props.action}>
            <Container style={buttonStyle.style}>
                <SharingIcon svgScale={buttonStyle.scale}/>
            </Container>
        </button>
    );
}

export default ShareButton;