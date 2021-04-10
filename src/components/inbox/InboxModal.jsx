import React, { useState } from "react";
import { Card, Container } from "react-bulma-components";
import { color, font } from "../../styling/ColorFontConfig";
import Inbox from "./Inbox";
import { cardStyle } from "../../styling/StyleComponents";
import { InboxModalIcon } from "../../styling/svgIcons";

import PostTab from "../stream/posts/PostTab";
import { panelStyle, tabStyle } from "../../styling/StyleComponents";


// local styling
var inboxIconStyle = {
    transform: "rotate(-35deg)",
    width: "3em",
    float: "left",
    marginTop: "-0.8em",
    marginLeft: "-0.8em",
    zIndex: "5",
}

var inboxTitleStyle = {
    textAlign: "center", 
    marginRight: "1em", 
    fontSize: "2.5em",
    height: "3.3em",
    color: color.baseLightGrey,
    fontWeight: "400",
    paddingTop: "0.8em",

}

var shadowDividorStyle = {
    border:"none",
    width: "100%",
    height: "50px",
    boxShadow:"0 10pt 10pt -15pt rgb(0,0,0,0.8)",
    margin: "-40pt auto -15pt",
    backgroundColor: color.backgroundCreamLighter,
}

function InboxModal (props){
    const [tabSelected, setTabSelected] = useState("like")

    const selectTab = (tab) => {
        switch(tab) {
            case "like":
                setTabSelected("like")
                break;
            case "follow":
                setTabSelected("follow")
                break;
            case "post":
                setTabSelected("post")
                break;
            default:
            break
        }
    }
    
    const SelectionPanel = () => {
    // custom selection tab
    // text, markdown, image
    return (
        <Container style={{...panelStyle, paddingBottom: "0.25em"}}>
            <PostTab style={tabStyle} text="Like" active={tabSelected === "like"} action={() => selectTab("like")}/>
            <PostTab style={tabStyle} text="Follow" active={tabSelected === "follow"} action={() => selectTab("follow")}/>
            <PostTab style={tabStyle} text="Post"active={tabSelected === "post"} action={() => selectTab("post")}/>
        </Container>  
    )
    }

    return (
        <Card style={{...cardStyle, backgroundColor: color.backgroundCreamLighter, width: "420pt"}} className="animate__animated animate__slideInDown">
            
            {/* <Container style={inboxIconStyle}>
                <InboxModalIcon svgScale={"75"}/>
            </Container>
            <Container>
                <p style={inboxTitleStyle}>Inbox</p>
            </Container> */}
            <hr style={{...shadowDividorStyle, marginTop: "-3.2em", backgroundColor: "transparent"}}></hr>
            <Card.Content style={{marginTop: "0.8em", marginBottom: "3.2em"}}>
                <Inbox selectedTab={tabSelected}/> 
            </Card.Content>
            <hr style={{...shadowDividorStyle, transform: "rotate(180deg)"}}></hr>
            <div style={{marginTop: "-3.7em"}}>
            <SelectionPanel/>
            </div>
        </Card>
    )
}


export default InboxModal;