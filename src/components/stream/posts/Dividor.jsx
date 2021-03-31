/*
A horizontal line seperator.
*/
import { Container } from "react-bulma-components";
import { color } from "./styling";

// local styling for this component
var divStyle = {
    height: "0em",
    borderBottom: "0.1px " + color.baseLightGrey + " dashed",
    marginLeft: "0em",
    marginRight: "0em",
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