/*
props.action - onClick event handler
*/

import { Container } from "react-bulma-components";
import {color} from "../styling";

var buttonStyle = {
    scale: "35",
    style: {
      fill: color.buttonGreen,
    }
  }

  
function FriendButton(props) {
    return (
        <Container style={buttonStyle.style}>
            <a onClick={props.action}>
                <svg xmlns="http://www.w3.org/2000/svg" width={buttonStyle.scale} height="auto" viewBox="0 0 45.415 45.415">
                <g id="Group_55" data-name="Group 55" transform="translate(-563.995 -537.585)">
                <g id="_2097681" data-name="2097681" transform="translate(563.995 537.585)">
                    <path id="Path_131" data-name="Path 131" class="cls-1" d="M405.742,3.757H403.3V1.331a1.331,1.331,0,1,0-2.661,0V3.757H398.19a1.331,1.331,0,0,0,0,2.661h2.446V8.845a1.331,1.331,0,1,0,2.661,0V6.418h2.446a1.331,1.331,0,0,0,0-2.661Z" transform="translate(-361.657)"/>
                    <path id="Path_132" data-name="Path 132" class="cls-1" d="M7.657,315.937c0-.353.015-.7.043-1.053a9.894,9.894,0,0,1-4.742-2.862A8.824,8.824,0,0,0,0,318.617V329.76H7.657Z" transform="translate(0 -284.345)"/>
                    <path id="Path_133" data-name="Path 133" class="cls-1" d="M44.179,162.775a11.328,11.328,0,0,1-1.711-6c0-.237.008-.472.023-.706a7.185,7.185,0,0,0-3.357,13.954,13.609,13.609,0,0,1,5.045-7.251Z" transform="translate(-30.96 -142.12)"/>
                    <path id="Path_134" data-name="Path 134" class="cls-1" d="M168.54,83.948a8.767,8.767,0,1,1,8.8-8.767A8.8,8.8,0,0,1,168.54,83.948Z" transform="translate(-145.567 -60.523)"/>
                    <path id="Path_135" data-name="Path 135" class="cls-1" d="M137.08,256.369a11.473,11.473,0,0,1-16.2,0,10.879,10.879,0,0,0-4.556,8.851v13.823h25.31V265.22A10.879,10.879,0,0,0,137.08,256.369Z" transform="translate(-106.009 -233.629)"/>
                </g>
                </g>
                </svg>
            </a>
        </Container>
    );
}

export default FriendButton;