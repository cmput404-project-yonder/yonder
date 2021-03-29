/*
An edit button.
    props.action - onClick event
*/

import { EditButton } from "../ProfileIcons";
import { Container, Button } from "react-bulma-components";
import { color } from "../styling";

// local styling
var buttonStyle = {
  scale: "20",
  style: {
    fill: "white",
    paddingTop: "3pt",
    paddingLeft: "2pt",
  },
  button: {
    height: "2.5em",
    width: "2.5em",
    borderRadius: "100%",
    backgroundColor: color.baseRed,
    border: "none",
  }
};

// component
function EditProfileButton(props) {
  return (
    <Container style={props.style}>
      <Button onClick={props.onClick} style={buttonStyle.button}>
        <Container style={buttonStyle.style}>
          <EditButton svgScale={buttonStyle.scale} />
        </Container>
      </Button>
    </Container>
  );
}

export default EditProfileButton;
