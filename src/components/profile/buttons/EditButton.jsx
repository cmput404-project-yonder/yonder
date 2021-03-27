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
  override: {
    border: "none",
    backgroundColor: "transparent",
  }
};

// component
function EditProfileButton(props) {
  return (
    <Container style={buttonStyle.style}>
      <Button onClick={props.onClick} style={buttonStyle.override}>
        <EditButton svgScale={buttonStyle.scale} />
      </Button>
    </Container>
  );
}

export default EditProfileButton;
