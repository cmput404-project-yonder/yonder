/*
An edit button.
    props.action - onClick event
*/

import { EditButton } from "../ProfileIcons";
import { Container, Button } from "react-bulma-components";
import { color } from "../styling";

// local styling
var buttonStyle = {
  scale: "40",
  style: {
    fill: color.buttonRed,
  },
};

// component
function EditProfileButton(props) {
  return (
    <Container style={buttonStyle.style}>
        <EditButton svgScale={buttonStyle.scale} />
    </Container>
  );
}

export default EditProfileButton;
