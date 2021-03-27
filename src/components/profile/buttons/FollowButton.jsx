/*
props.action - onClick event handler
*/

import { Container, Button } from "react-bulma-components";
import { color } from "../styling";

var buttonStyle = {
  scale: "40",
  style: {
    fill: color.buttonRed,
  },
};

function FollowButton(props) {
  return (
    <Container style={buttonStyle.style}>
      <Button onClick={props.action}>
        <svg xmlns="http://www.w3.org/2000/svg" width={buttonStyle.scale} viewBox="0 0 45.415 45.415">
          <g id="Group_56" data-name="Group 56" transform="translate(-372.995 -531.292)">
            <g id="_907873" data-name="907873" transform="translate(372.995 531.292)">
              <g id="Group_50" data-name="Group 50" transform="translate(28.503)">
                <g id="Group_49" data-name="Group 49">
                  <path
                    id="Path_128"
                    data-name="Path 128"
                    class="cls-1"
                    d="M336.916,7.126h-5.8v-5.8a1.331,1.331,0,1,0-2.661,0v5.8h-5.8a1.331,1.331,0,0,0,0,2.661h5.8v5.8a1.331,1.331,0,1,0,2.661,0v-5.8h5.8a1.331,1.331,0,0,0,0-2.661Z"
                    transform="translate(-321.334)"
                  />
                </g>
              </g>
              <g id="Group_52" data-name="Group 52" transform="translate(0 28.503)">
                <g id="Group_51" data-name="Group 51">
                  <path
                    id="Path_129"
                    data-name="Path 129"
                    class="cls-1"
                    d="M15.582,321.334A15.6,15.6,0,0,0,0,336.916a1.331,1.331,0,0,0,1.331,1.331h28.5a1.331,1.331,0,0,0,1.331-1.331A15.6,15.6,0,0,0,15.582,321.334Z"
                    transform="translate(0 -321.334)"
                  />
                </g>
              </g>
              <g id="Group_54" data-name="Group 54" transform="translate(7.126 5.701)">
                <g id="Group_53" data-name="Group 53">
                  <path
                    id="Path_130"
                    data-name="Path 130"
                    class="cls-1"
                    d="M88.79,64.267a8.456,8.456,0,1,0,8.456,8.456A8.466,8.466,0,0,0,88.79,64.267Z"
                    transform="translate(-80.334 -64.267)"
                  />
                </g>
              </g>
            </g>
          </g>
        </svg>
    </Container>
  );
}

export default FollowButton;
