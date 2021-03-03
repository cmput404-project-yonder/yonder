/*
A horizontal line seperator.
*/
import { Container } from "react-bulma-components";
import { color } from "./styling";

// local styling for this component
var divStyle = {
    height: "0em",
    borderBottom: "0.1px " + color.baseLightGrey + " dashed",
    marginLeft: "1em",
    marginRight: "1em",
}

// component
function Dividor(props) {
    return (
        <Container style={props.style}>
            <div style={divStyle}/>
        </Container>
    );
}

export default Dividor;