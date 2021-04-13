/*
An edit button.
    props.action - onClick event
*/

import { Container, Button } from "react-bulma-components";
import { color } from "../styling";

// local styling
var buttonStyle = {
  scale: "30",
  style: {
    fill: color.baseRed,
    paddingTop: "3pt",
    paddingLeft: "0pt",
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
function FollowManagerButton(props) {
  return (
    <Container style={props.style}>
      <Button onClick={props.onClick} style={buttonStyle.button}>
        <Container style={buttonStyle.style}>
          <svg xmlns="http://www.w3.org/2000/svg" width={buttonStyle.scale}  viewBox="0 0 511.999 434.318">
  <g id="group_1_" data-name="group(1)" transform="translate(0 -38.84)">
    <g id="Group_134" data-name="Group 134">
      <g id="Group_133" data-name="Group 133">
        <path id="Path_394" data-name="Path 394" d="M438.09,273.32h-39.6a103,103,0,0,1,6.241,35.4v149.65a44.129,44.129,0,0,1-2.543,14.782h65.461A44.4,44.4,0,0,0,512,428.81V347.229A73.992,73.992,0,0,0,438.09,273.32Z"/>
      </g>
    </g>
    <g id="Group_136" data-name="Group 136">
      <g id="Group_135" data-name="Group 135">
        <path id="Path_395" data-name="Path 395" d="M107.265,308.725a102.994,102.994,0,0,1,6.241-35.4H73.91A73.994,73.994,0,0,0,0,347.231v81.581a44.4,44.4,0,0,0,44.346,44.346h65.462a44.144,44.144,0,0,1-2.543-14.783Z"/>
      </g>
    </g>
    <g id="Group_138" data-name="Group 138">
      <g id="Group_137" data-name="Group 137">
        <path id="Path_396" data-name="Path 396" d="M301.261,234.815H210.739a73.994,73.994,0,0,0-73.91,73.91v149.65a14.782,14.782,0,0,0,14.782,14.782H360.389a14.782,14.782,0,0,0,14.782-14.782V308.725A73.994,73.994,0,0,0,301.261,234.815Z"/>
      </g>
    </g>
    <g id="Group_140" data-name="Group 140">
      <g id="Group_139" data-name="Group 139">
        <path id="Path_397" data-name="Path 397" d="M256,38.84a88.871,88.871,0,1,0,88.886,88.887A88.987,88.987,0,0,0,256,38.84Z"/>
      </g>
    </g>
    <g id="Group_142" data-name="Group 142">
      <g id="Group_141" data-name="Group 141">
        <path id="Path_398" data-name="Path 398" d="M99.918,121.689a66.442,66.442,0,1,0,66.475,66.475A66.55,66.55,0,0,0,99.918,121.689Z"/>
      </g>
    </g>
    <g id="Group_144" data-name="Group 144">
      <g id="Group_143" data-name="Group 143">
        <path id="Path_399" data-name="Path 399" d="M412.082,121.689a66.475,66.475,0,1,0,66.475,66.475A66.55,66.55,0,0,0,412.082,121.689Z"/>
      </g>
    </g>
  </g>
</svg>




        </Container>
      </Button>
    </Container>
  );
}

export default FollowManagerButton;
