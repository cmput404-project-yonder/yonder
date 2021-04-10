/*
    props.action - onClick event
*/

import { AddIcon } from "./postSVG";
import { Container, Button } from "react-bulma-components";
import { color } from "../styling";

// local styling
var buttonFloatStyle = {
    scale: "32",
    style: {
        button: {
            height: "3.6em",
            width: "3.6em",
            borderRadius: "12pt",
            boxShadow: "0pt 0pt 8pt rgb(0,0,0,0.3)",
            backgroundColor: "#686863",
            border: "none",
        },
        icon: {
            paddingTop: "3pt",
            paddingLeft: "5pt",
            fill: "white",
        }
    }
}

var buttonFLatStyle = {
    scale: "28",
    style: {
        button:{
            height: "3em",
            width: "3em",
            borderRadius: "9pt",
            backgroundColor: "transparent",
            border: "solid",
            borderColor: color.baseRed,
            borderWidth: "1.5pt"
        },
        icon: {
            paddingTop: "3pt",
            paddingLeft: "5pt",
            fill: color.baseRed,
        },
    }
}

// component
function AddButton(props) {

    if (props.isFlat) {
        var buttonStyle = buttonFLatStyle;
    } else {
        var buttonStyle = buttonFloatStyle;
    }

    return (
        <Container style={props.style}>
            <Button style={buttonStyle.style.button} onClick={props.action}>
                <Container style={buttonStyle.style.icon}>
                    <AddIcon svgScale={buttonStyle.scale}/>
                </Container>
            </Button>
        </Container>
    );
}

export default AddButton;