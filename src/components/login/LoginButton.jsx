import { LoginIcon } from "../../styling/svgIcons";
import { Container, Button } from "react-bulma-components";
import { color } from "./styling";

// local styling
// var buttonStyle = {
//   scale: "25",
//   style: {
//     fill: color.baseRed,
//     paddingTop: "3pt",
//     paddingRight: "3pt",
//   },
//   button: {
//     height: "3em",
//     width: "3em",
//     borderRadius: "9pt",
//     backgroundColor: "transparent",
//     border: "solid",
//     borderColor: color.baseRed,
//     borderWidth: "2.2pt"
//   }
// };

var buttonStyle = {
  scale: "25",
  style: {
    fill: "white",
    paddingTop: "4pt",
    paddingRight: "3pt",
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
function LoginButton(props) {
  return (
    <Container style={props.style}>
      <Button onClick={props.onClick} style={buttonStyle.button}>
        <Container style={buttonStyle.style}>
          <LoginIcon svgScale={buttonStyle.scale} />
        </Container>
      </Button>
    </Container>
  );
}

export default LoginButton;
