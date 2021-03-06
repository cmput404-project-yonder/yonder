import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Card, Container } from "react-bulma-components";
import { color } from "../../styling/ColorFontConfig";
import Inbox from "./Inbox";
import { cardStyle, tabStyle, panelStyle } from "../../styling/StyleComponents";

import PostTab from "../stream/posts/PostTab";
import DeleteButton from "./DeleteButton";
import { clearInbox } from "../NavigationActions";

// local styling

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
            <Container style={{...panelStyle, paddingBottom: "0em"}}>
                <PostTab style={tabStyle} text="Like" active={tabSelected === "like"} action={() => selectTab("like")}/>
                <PostTab style={tabStyle} text="Follow" active={tabSelected === "follow"} action={() => selectTab("follow")}/>
                <PostTab style={tabStyle} text="Post"active={tabSelected === "post"} action={() => selectTab("post")}/>
                <div style={{fontSize: "0.65em", marginTop: "0.2em"}}><ToolTip/></div>
            </Container>  
        )
    }

    
    const ToolTip = () => {
        return (
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
        )
    }  

    return (
        <Card style={{...cardStyle, borderRadius: "12pt",backgroundColor: color.backgroundCreamLighter, width: "430pt", height: "auto", padding: "1em"}} className="animate__animated animate__slideInDown">
            <Card style={{...cardStyle, margin: "auto", backgroundColor: "#FFF8EA", height: "48em"}} >


                {/* <Container style={inboxIconStyle}>
                    <InboxModalIcon svgScale={"75"}/>
                </Container>
                <Container>
                    <p style={inboxTitleStyle}>Inbox</p>
                </Container> */}
                {/* <hr style={{...shadowDividorStyle, marginTop: "-2em", backgroundColor: "transparent"}}></hr> */}
                
                <Card.Content>
                    <Container className="animate__animated animate__headShake" key={tabSelected}>
                        <Inbox selectedTab={tabSelected} /> 
                    </Container>
                </Card.Content>
                {/* <hr style={{...shadowDividorStyle, transform: "rotate(180deg)", backgroundColor: "transparent"}}></hr> */}

            </Card>
            <Container style={{height: "4em", marginTop: "1.4em"}}>
                <SelectionPanel/>
            </Container>
        </Card>
    )
}

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, { clearInbox })(withRouter(InboxModal));
