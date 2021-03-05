/*
An edit button.
    props.action - onClick event
*/

import { EditButton } from "./ProfileViewSVG";
import { Container, Button } from "react-bulma-components";
import { color } from "./styling";

// local styling
var buttonStyle = {
  scale: "32",
  style: {
    padding: "1.2em",
    fill: color.baseBlack,
  },
};

// component
function EditProfileButton(props) {
  return (
    <Container style={buttonStyle.style}>
      <Button href="#" onClick={props.action}>
        <EditButton svgScale={buttonStyle.scale} />
      </Button>
    </Container>
  );
}

export default EditProfileButton;
