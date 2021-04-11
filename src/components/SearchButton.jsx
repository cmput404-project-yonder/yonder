import { Container, Button } from "react-bulma-components";
import { color } from "../styling/ColorFontConfig";

// local styling
var buttonStyle = {
    scale: "25",
    text: {
        color: color.textLightGreyOnCream,
        fontSize: "1.3em",
    },
    style: {
        button: {
            height: "3.5em",
            width: "3.5em",
            borderRadius: "100%",
            backgroundColor: "#E6A98D",
            border: "none",
        },
        icon: {
            paddingTop: "2pt",
            paddingLeft: "0pt",
            fill: "rgb(255,255,255,0.9)",
        }
    }
}

// component
function SearchButton(props) {

    return (
        <Container style={props.style}>
            <Button style={buttonStyle.style.button} onClick={props.action}>
                <Container style={buttonStyle.style.icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={buttonStyle.scale} viewBox="0 0 39.355 40.763">
                    <path id="search" d="M39.74,37.129l-9.7-10.09a16.451,16.451,0,1,0-12.6,5.878,16.282,16.282,0,0,0,9.429-2.978L36.646,40.1a2.147,2.147,0,1,0,3.094-2.976ZM17.442,4.293A12.165,12.165,0,1,1,5.277,16.458,12.178,12.178,0,0,1,17.442,4.293Z" transform="translate(-0.984)" fill="#fff"/>
                    </svg>
                </Container>
            </Button>
            <p style={buttonStyle.text}>Search</p>
        </Container>
    );
}

export default SearchButton;