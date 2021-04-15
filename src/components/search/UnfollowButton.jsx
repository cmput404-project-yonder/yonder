/*
    props.action - onClick event
*/

import { Container, Button } from "react-bulma-components";
import {color} from "../../styling/ColorFontConfig";


// local styling
var buttonStyle = {
    scale: "31",
    style: {
      fill: color.buttonRed,
      paddingTop: "3pt",
      paddingLeft: "2pt",
    },
    button: {
      height: "2.5em",
      width: "2.5em",
      borderRadius: "100%",
      backgroundColor: "transparent",
      border: "none",
    }
  };

// component
function UnfollowButton(props) {

    return (
        <Container style={props.style}>
        <Button onClick={props.onClick} style={buttonStyle.button}>
          <Container style={buttonStyle.style}>
            <svg xmlns="http://www.w3.org/2000/svg" width={buttonStyle.scale} viewBox="0 0 511.979 371.354">
            <g id="unfriend" transform="translate(0 -70.312)">
            <path id="Path_206" data-name="Path 206" d="M404.975,70.312a107,107,0,1,0,107,107,107.125,107.125,0,0,0-107-107Zm55.337,122H349.638v-30H460.312Z"/>
            <path id="Path_207" data-name="Path 207" d="M133.3,238.169l8.98,3.935v20.26a24.9,24.9,0,1,0,49.8,0V242.1l8.98-3.935a84.554,84.554,0,1,0-67.761,0Z"/>
            <path id="Path_208" data-name="Path 208" d="M242.386,247.081a114.39,114.39,0,0,1-20.306,14.158v1.125a54.9,54.9,0,1,1-109.8,0v-1.125a114.472,114.472,0,0,1-20.3-14.154A116.625,116.625,0,0,0,0,360.924v80.742H60.136V343.077h30v98.589H244.224V343.077h30v98.589H334.36V360.924a116.633,116.633,0,0,0-91.974-113.843Z"/>
            </g>
            </svg>

          </Container>
          </Button>
      </Container>
    );
}

export default UnfollowButton;