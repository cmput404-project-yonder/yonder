import { SignupIcon } from "../../styling/svgIcons";
import { Container, Button } from "react-bulma-components";
import { color } from "./styling";

// local styling
var buttonStyle = {
  scale: "25",
  style: {
    fill: "white",
    paddingTop: "3pt",
    paddingLeft: "2pt",
  },
  button: {
    height: "3.2em",
    width: "3.2em",
    borderRadius: "100%",
    backgroundColor: color.baseRed,
    border: "none",
  }
};

// component
function SignupButton(props) {
  return (
    <Container style={props.style}>
      <Button onClick={props.onClick} style={buttonStyle.button}>
        <Container style={buttonStyle.style}>
          <SignupIcon svgScale={buttonStyle.scale} />
        </Container>
      </Button>
    </Container>
  );
}

export default SignupButton;
