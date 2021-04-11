/*
    props.action - onClick event
*/

import { Container, Button } from "react-bulma-components";
import {color} from "../../../styling/ColorFontConfig";


// local styling
var buttonStyle = {
  scale: "32",
  style: {
    fill: color.baseRed,
    paddingTop: "3pt",
    paddingLeft: "1pt",
  },
  button: {
    height: "3.6em",
    width: "3.6em",
    borderRadius: "9pt",
    backgroundColor: "transparent",
    border: "solid",
    borderColor: color.baseRed,
    borderWidth: "2pt"
  }
};

// component
function UnfollowButton(props) {
  return (
    <Container style={props.style}>
      <Button onClick={props.onClick} style={buttonStyle.button}>
        <Container style={buttonStyle.style}>
          <svg xmlns="http://www.w3.org/2000/svg" width={buttonStyle.scale}  viewBox="0 0 219.068 187.633">
            <g id="follower" transform="translate(0 -19)">
              <g id="Group_94" data-name="Group 94" transform="translate(0 19)">
                <g id="Group_93" data-name="Group 93">
                  <path id="Path_231" data-name="Path 231" d="M447.568,112.912H406.743c-5.934,0-10.743,1.81-10.743,7.743s4.81,7.743,10.743,7.743h40.825c5.934,0,10.743-1.81,10.743-7.743S453.5,112.912,447.568,112.912Z" transform="translate(-239.243 -77.985)"/>
                  <path id="Path_232" data-name="Path 232" d="M124.855,110.137a50.867,50.867,0,1,0-62.076,0A93.834,93.834,0,0,0,0,198.716a7.917,7.917,0,0,0,7.917,7.917h171.8a7.917,7.917,0,0,0,7.917-7.917A93.844,93.844,0,0,0,124.855,110.137ZM58.784,69.867A35.033,35.033,0,1,1,93.817,104.9,35.072,35.072,0,0,1,58.784,69.867ZM16.233,190.8a77.987,77.987,0,0,1,155.167,0Z" transform="translate(0 -19)"/>
                </g>
              </g>
            </g>
          </svg>
        </Container>
      </Button>
    </Container>
  );
}

export default UnfollowButton;