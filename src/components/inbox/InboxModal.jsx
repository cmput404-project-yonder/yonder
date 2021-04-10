import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Card, Container } from "react-bulma-components";

import { color, font } from "./styling";
import Inbox from "./Inbox";
import { cardStyle, panelStyle, tabStyle } from "../../styling/StyleComponents";
import { InboxModalIcon } from "../../styling/svgIcons";
import PostTab from "../stream/posts/PostTab";
import DeleteButton from "../stream/posts/buttons/DeleteButton";
import { clearInbox } from "../stream/StreamActions";


// local styling
var inboxIconStyle = {
    transform: "rotate(-30deg)",
    width: "3em",
    float: "left",
    marginTop: "-1em",
    marginLeft: "-1em",
    zIndex: "5",
}

var inboxTitleStyle = {
    textAlign: "center", 
    marginRight: "1em", 
    fontSize: "2em",
    padding: "1.2em",
    color: color.baseBlack,
    fontFamily: font.segoeUI,
    fontWeight: "300",
}

var shadowDividorStyle = {
    border:"none",
    width: "100%",
    height: "50px",
    boxShadow:"0 10pt 10pt -15pt rgb(0,0,0,0.8)",
    margin: "-40pt auto -15pt",
    backgroundColor: color.backgroundCream,
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
        <Container style={{...panelStyle, paddingBottom: "1em"}}>
          <PostTab style={tabStyle} text="Like" active={tabSelected === "like"} action={() => selectTab("like")}/>
          <PostTab style={tabStyle} text="Follow" active={tabSelected === "follow"} action={() => selectTab("follow")}/>
          <PostTab style={tabStyle} text="Post"active={tabSelected === "post"} action={() => selectTab("post")}/>
        </Container>
      )
    }

    return (
      <Card style={cardStyle} >
        <Container style={inboxIconStyle}>
          <InboxModalIcon svgScale={"55"}/>
        </Container>
        <Container>
          <p style={inboxTitleStyle}> Your Inbox</p>
        </Container>
        <DeleteButton action={() => props.clearInbox()}/>
        <hr style={shadowDividorStyle}></hr>
        <Card.Content style={{marginTop: "1.2em", marginBottom: "1.2em"}}>
          <Inbox selectedTab={tabSelected}/> 
        </Card.Content>
        <hr style={{...shadowDividorStyle, transform: "rotate(180deg)"}}></hr>
        <SelectionPanel/>
      </Card>
    )
}

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, { clearInbox })(withRouter(InboxModal));
