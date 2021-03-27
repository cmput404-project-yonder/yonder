/*
    props.action - onClick event
*/

import { AddIcon } from "./postSVG";
import { Container, Button } from "react-bulma-components";

// local styling
var buttonStyle = {
    scale: "25",
    style: {
        button: {
            height: "3em",
            width: "3em",
            borderRadius: "100%",
            boxShadow: "0pt 0pt 8pt rgb(0,0,0,0.5)",
            backgroundColor: "rgb(201,98,98,0.8)",
            border: "none",
        },
        icon: {
            paddingTop: "3pt",
            paddingLeft: "1pt",
            fill: "rgb(255,255,255,0.9)",
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