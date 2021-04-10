/*
A horizontal line seperator.
*/
import { Container } from "react-bulma-components";
import { color } from "./styling";

// local styling for this component
var divStyle = {
    height: "1pt",
    marginTop: "-3pt",
    marginBottom: "-3pt",
    backgroundColor: "rgb(168,157,146, 0.2)",
    borderRadius: "6pt",
}

// component
function Dividor(props) {
    return (
        <Container style={props.style}>
            <hr style={divStyle}/>
        </Container>
    );
}

export default Dividor;