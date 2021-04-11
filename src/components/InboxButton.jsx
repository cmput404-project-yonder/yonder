import { InboxIcon } from "../styling/svgIcons";
import { Container, Button } from "react-bulma-components";
import { color } from "../styling/ColorFontConfig";

// local styling
var buttonStyle = {
    scale: "27",
    text: {
        color: color.textLightGreyOnCream,
        fontSize: "1.3em",
    },
    style: {
        button: {
            height: "3.5em",
            width: "3.5em",
            borderRadius: "100%",
            backgroundColor: "#83CBCB",
            border: "none",
        },
        icon: {
            paddingTop: "1pt",
            paddingLeft: "0.2pt",
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