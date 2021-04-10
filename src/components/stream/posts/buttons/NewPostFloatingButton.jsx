/*
    props.action - onClick event
*/

import { AddIcon } from "./postSVG";
import { Container, Button } from "react-bulma-components";

// local styling
var buttonStyle = {
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

// component
function AddButton(props) {

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