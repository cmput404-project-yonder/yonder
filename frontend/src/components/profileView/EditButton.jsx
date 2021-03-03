/*
An edit button.
    props.action - onClick event
*/

import { EditButton } from "./ProfileViewSVG";
import { Container } from "react-bulma-components";
import { color } from "./styling";

// local styling
var buttonStyle = {
    scale: "32",
    style: {
        paddingTop: "1.5em",
        paddingBottom: "2em",
        fill: color.baseBlack,
    }
}

// component
function EditProfileButton(props) {

    return (
        <Container style={buttonStyle.style}>
            <a onClick={props.action}><EditButton svgScale={buttonStyle.scale}/></a>
        </Container>
    );
}

export default EditProfileButton;