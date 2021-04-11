/*
An edit button.
    props.action - onClick event
*/

import { EditButton } from "../ProfileIcons";
import { Container, Button } from "react-bulma-components";
import { color } from "../styling";

// local styling
var buttonStyle = {
  scale: "32",
  style: {
    fill: color.baseRed,
    paddingTop: "3pt",
    paddingLeft: "0pt",
  },
  button: {
    height: "3.6em",
    width: "3.6em",
    borderRadius: "9pt",
    backgroundColor: "transparent",
    border: "solid",
    borderColor: color.baseRed,
    borderWidth: "2pt"
  }
};

// component
function EditProfileButton(props) {
  return (
    <Container style={props.style}>
      <Button onClick={props.onClick} style={buttonStyle.button}>
        <Container style={buttonStyle.style}>
        <svg xmlns="http://www.w3.org/2000/svg" width={buttonStyle.scale} viewBox="0 0 512 512">
        <path id="edit" d="M206,512H120A120.136,120.136,0,0,1,0,392V120A120.136,120.136,0,0,1,120,0H392A120.136,120.136,0,0,1,512,120V220a20,20,0,0,1-40,0V120a80.091,80.091,0,0,0-80-80H120a80.091,80.091,0,0,0-80,80V392a80.091,80.091,0,0,0,80,80h86a20,20,0,0,1,0,40Zm27-372a60,60,0,1,0-60,60A60.068,60.068,0,0,0,233,140Zm-40,0a20,20,0,1,1-20-20A20.023,20.023,0,0,1,193,140Zm239,54a20,20,0,0,0-20-20H288a20,20,0,0,0,0,40H412A20,20,0,0,0,432,194ZM284,334a20,20,0,0,0-20-20H118a20,20,0,0,0,0,40H264A20,20,0,0,0,284,334Zm-80,70a20,20,0,0,0-20-20H118a20,20,0,0,0,0,40h66A20,20,0,0,0,204,404Zm85.92,107.612,56.664-11.326a144.185,144.185,0,0,0,73.926-39.558l70.108-70.109A73,73,0,1,0,387.381,287.381L317.272,357.49a144.192,144.192,0,0,0-39.558,73.926L266.388,488.08a20,20,0,0,0,23.532,23.532ZM462.334,315.666a33,33,0,0,1,0,46.668l-70.109,70.109a104.29,104.29,0,0,1-53.48,28.618l-27.253,5.447,5.447-27.253a104.3,104.3,0,0,1,28.618-53.48l70.109-70.11a33,33,0,0,1,46.668,0ZM412,144H288a20,20,0,0,1,0-40H412a20,20,0,1,1,0,40ZM240.791,273.462a20,20,0,0,0-1.329-28.253A89.091,89.091,0,0,0,179.35,222h-12.7a89.091,89.091,0,0,0-60.112,23.209,20,20,0,0,0,26.924,29.582A49.183,49.183,0,0,1,166.65,262h12.7a49.179,49.179,0,0,1,33.188,12.791,20,20,0,0,0,28.254-1.329Z"/>
        </svg>

        </Container>
      </Button>
    </Container>
  );
}

export default EditProfileButton;
