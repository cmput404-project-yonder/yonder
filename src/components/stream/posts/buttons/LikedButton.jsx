/*
    props.action - onClick event
*/

import { LikedIcon } from "./postSVG";
import { Container } from "react-bulma-components";
import { color } from "../../../profile/styling";
import { useState } from "react";


// local styling
var buttonStyle = {
    scale: "20",
    style: {
        fill: color.buttonRed,
        display: "flex",
        justifyContent: "flex-start",
        gap: "0.5em",

    },
    override: {
        height: "2.5em",
        width: "6em",
        border: "none",
        backgroundColor: "transparent",
        cursor: "pointer",
    },
    counter: {
        color: color.baseLightGrey,
        fontSize: "1.3em",
        fontWeight: "350",
    }
}

function getDisplayNum(num) {
    if (num >= 10**9) {
        // no one is that famous
        return Math.floor(num/10**9) + 'b';
    }
    if (num >= 10**6) {
        return Math.floor(num/10**6) + 'm';
    }
    if (num >= 10**3) {
        return Math.floor(num/10**3) + 'k';
    }

    return num;
}


// component
function LikeButton(props) {
    return (
        <button type="button"  style={buttonStyle.override} onClick={props.action}>
            <Container className="animate__animated animate__headShake" style={buttonStyle.style} class="likeButton">
                <LikedIcon svgScale={buttonStyle.scale} />
                <p style={buttonStyle.counter}>{getDisplayNum(props.count)}</p>
            </Container>
        </button>
    );
}

export default LikeButton;