/*
    props.action - onClick event
*/

import { DeleteIcon } from "../stream/posts/buttons/postSVG";
import { Container } from "react-bulma-components";
import {color} from "../../styling/ColorFontConfig";


// local styling
var buttonStyle = {
    scale: "24",
    style: {
        fill: color.baseRed,
    },
    button: {
        cursor: "pointer",
        border: "none",
        backgroundColor: "transparent",
    }
}

// component
function DeleteButton(props) {

    return (
        <Container style={buttonStyle.style}>
            <button type="button" onClick={props.action} style={buttonStyle.button}>
            <svg xmlns="http://www.w3.org/2000/svg" width={buttonStyle.scale} viewBox="0 0 46.766 60.114">
            <g id="delete" transform="translate(0)">
                <path id="Path_150" data-name="Path 150" d="M129.093,3.629H139.14V5.319h3.628V3.392A3.394,3.394,0,0,0,139.379,0H128.855a3.4,3.4,0,0,0-3.39,3.392V5.319h3.629Zm0,0" transform="translate(-110.733 0)"/>
                <path id="Path_151" data-name="Path 151" d="M76.151,167.75H42.089a1.6,1.6,0,0,0-1.593,1.727l2.848,35.212a3.782,3.782,0,0,0,3.768,3.48H71.127a3.782,3.782,0,0,0,3.768-3.48l2.848-35.212a1.6,1.6,0,0,0-1.592-1.727ZM50.336,204.413c-.038,0-.076,0-.114,0a1.814,1.814,0,0,1-1.809-1.7l-1.785-28.907a1.814,1.814,0,0,1,3.622-.223l1.784,28.907a1.814,1.814,0,0,1-1.7,1.923ZM60.954,202.6a1.814,1.814,0,0,1-3.629,0V173.694a1.814,1.814,0,1,1,3.629,0ZM71.61,173.8l-1.7,28.907a1.814,1.814,0,0,1-1.809,1.708l-.108,0a1.814,1.814,0,0,1-1.7-1.918l1.7-28.908a1.814,1.814,0,0,1,3.622.214Zm0,0" transform="translate(-35.736 -148.054)"/>
                <path id="Path_152" data-name="Path 152" d="M46.689,81.36,45.5,77.788a2.307,2.307,0,0,0-2.189-1.577H3.458A2.307,2.307,0,0,0,1.27,77.788L.078,81.36A1.5,1.5,0,0,0,1.5,83.33H45.269a1.477,1.477,0,0,0,.793-.229,1.494,1.494,0,0,0,.627-1.741Zm0,0" transform="translate(0 -67.263)"/>
            </g>
            </svg>
            </button>

        </Container>
    );
}

export default DeleteButton;