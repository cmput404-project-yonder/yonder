import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Card, Container } from "react-bulma-components";
import { color, font } from "../../styling/ColorFontConfig";
import Inbox from "./Inbox";
import { cardStyle, tabStyle, panelStyle, checkBoxStyle } from "../../styling/StyleComponents";

import PostTab from "../stream/posts/PostTab";
import DeleteButton from "./DeleteButton";
import { clearInbox } from "../NavigationActions";

// local styling
var shadowDividorStyle = {
    border:"none",
    width: "100%",
    height: "50px",
    boxShadow:"0 10pt 10pt -15pt rgb(0,0,0,0.8)",
    margin: "-40pt auto -15pt",
    backgroundColor: color.backgroundCreamLighter,
}

var menuDropDownStyle = {
    borderRadius: "5pt",
    textAlign: "left",
    borderWidth: "1pt",
    padding: "1em",
    border: "1pt solid" + color.baseLightGrey,
    backgroundColor: "white",
    color: color.baseLightGrey,
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
            <Container style={{...panelStyle, paddingBottom: "0.25em", marginRight: "5.5em"}}>
                <PostTab style={tabStyle} text="Like" active={tabSelected === "like"} action={() => selectTab("like")}/>
                <PostTab style={tabStyle} text="Follow" active={tabSelected === "follow"} action={() => selectTab("follow")}/>
                <PostTab style={tabStyle} text="Post"active={tabSelected === "post"} action={() => selectTab("post")}/>
            </Container>  
        )
    }

    
    const ToolTip = () => {
        return (
          <Container style={checkBoxStyle}>
          <div class="dropdown is-hoverable is-up is-right" >
            <div class="dropdown-trigger" >
              <span
                style={{backgroundColor: "transparent", border: "none", fill: color.baseRed, padding: "0"}}
              >
              <DeleteButton action={() => props.clearInbox()}/>
              </span>
            </div>
            <div class="dropdown-menu animate__animated animate__fadeIn animate__faster" style={{minWidth: "250pt", marginBottom: "-8pt"}}>
              <div class="dropdown-content"style={menuDropDownStyle}>
                <p>
                  {"Warning, this action deletes all your inbox messages, this will remove people's old post from your stream"}
                </p>
              </div>
            </div>
          </div>    
          </Container>  
        )
    }  

    return (
        <Card style={{...cardStyle, backgroundColor: color.backgroundCreamLighter, width: "420pt", height: "462pt"}} className="animate__animated animate__slideInDown">
            
            {/* <Container style={inboxIconStyle}>
                <InboxModalIcon svgScale={"75"}/>
            </Container>
            <Container>
                <p style={inboxTitleStyle}>Inbox</p>
            </Container> */}
            <hr style={{...shadowDividorStyle, marginTop: "-1.2em", backgroundColor: "transparent"}}></hr>
            
            <Card.Content style={{marginTop: "0.8em", marginBottom: "3.2em"}}>
                <Inbox selectedTab={tabSelected}/> 
            </Card.Content>
            <hr style={{...shadowDividorStyle, transform: "rotate(180deg)", backgroundColor: "transparent"}}></hr>
            <div style={{marginTop: "-3.7em"}}>
            <Container>
                <SelectionPanel/>
            </Container>
            <Container style={{float: "right", marginTop: "-18pt", marginRight: "3em"}}>
                <ToolTip/>
            </Container>
            </div>
        </Card>
    )
}

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, { clearInbox })(withRouter(InboxModal));
