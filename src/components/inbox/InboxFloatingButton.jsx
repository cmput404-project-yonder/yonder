/*
    props.action - onClick event
*/

import { InboxIcon } from "../../styling/svgIcons";
import { Container, Button } from "react-bulma-components";

// local styling
var buttonStyle = {
    scale: "22",
    style: {
        button: {
            height: "3em",
            width: "3em",
            borderRadius: "100%",
            boxShadow: "0pt 0pt 6pt rgb(0,0,0,0.5)",
            backgroundColor: "rgb(121,207,235,0.8)",
            border: "none",
        },
        icon: {
            paddingTop: "1pt",
            paddingLeft: "0.5pt",
            fill: "rgb(255,255,255,0.9)",
        }
    }
}

// component
function InboxButton(props) {

    return (
        <Container style={props.style}>
            <Button style={buttonStyle.style.button} onClick={props.action}>
                <Container style={buttonStyle.style.icon}>
                    <InboxIcon svgScale={buttonStyle.scale}/>
                </Container>
            </Button>
        </Container>
    );
}

export default InboxButton;