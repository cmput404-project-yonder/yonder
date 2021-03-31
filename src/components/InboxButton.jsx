import { InboxIcon } from "../styling/svgIcons";
import { Container, Button } from "react-bulma-components";
import { color } from "../styling/ColorFontConfig";

// local styling
var buttonStyle = {
    scale: "20",
    text: {
        color: color.baseLightGrey,
    },
    style: {
        button: {
            height: "3em",
            width: "3em",
            borderRadius: "100%",
            backgroundColor: color.buttonBlue,
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
            <p style={buttonStyle.text}>Inbox</p>
        </Container>
    );
}

export default InboxButton;