/*
    props.action - onClick event
*/

import { LikeIcon } from "./buttons/postSVG";
import { Container } from "react-bulma-components";
import { color } from "../../../profile/styling";


// local styling
var buttonStyle = {
    scale: "20",
    style: {
        fill: color.buttonRed,
    }
}

// component
function LikeButton(props) {
    return (
        <Container style={buttonStyle.style} class="likeButton">
            <a onClick={props.action}><LikeIcon svgScale={buttonStyle.scale} /></a>
        </Container>
    );
}

export default LikeButton;