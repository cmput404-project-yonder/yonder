/*
A horizontal line seperator.
*/
import { color } from "./styling";

// local styling for this component
var divStyle = {
    height: "1em",
    borderBottom: "0.1px " + color.baseLightGrey + " dashed",
    marginLeft: "1em",
    marginRight: "1em",
}

// component
function Dividor() {
    return (
        <div style={divStyle}/>
    );
}

export default Dividor;