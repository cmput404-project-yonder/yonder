import React from "react";
import { Content, Container } from "react-bulma-components";
import { YonderLogo, GithubLogo } from "./ProfileIcons";

import { color } from "./styling";


// local styling of this component
var shadowDividorStyle = {
  border:"none",
  width: "110%",
  height: "50px",
  boxShadow:"0 10pt 10pt -15pt rgb(0,0,0,0.3)",
  margin: "-40pt auto -15pt",
  marginLeft: "-2.5em",
  backgroundColor: color.backgroundCreamLighter,
}
var statusStyle = {
    overall: {},
    displayName: {
      textAlign: "center",
      paddingBottom: "0.5em",
      paddingTop: "0.7em",
      fontSize: "3.4em",
      fontWeight: "500",
      color: color.baseGreyHard,
    },
    statusBar: {
      overall: {
        display: "flex",
        justifyContent: "space-between",
        paddingBottom: "2.5em",
      },
      block: {
        textAlign: "center",
        fontWeight: "500",
        fontSize: "1.7em",
        color: color.baseGreyHard,
        width: "100%",
      },
      counter: {
        fontSize: "0.9em",
      },
    },
  };
  
  var infoStyle = {
    overall: {
      display: "flex",
      flexDirection: "column",
      paddingTop: "1em",
      paddingBottom: "0.5em",
      width: "auto",
    },
    banner: {
      display: "flex",
      fontSize: "1.6em",
      color: color.baseGreyHard,
      alignItems: "center",
      whiteSpace: "nowrap",
      overflow: "hidden",
    },
  };
  
  var svgIconStyle = {
    scale: "50",
    style: {
      fill: color.baseBlack,
      padding: "1.1em",
    },
  };
  

function ProfileStatusView(props) {
  return (
      <Container style={statusStyle.overall}>
          {/* this section display the displayName from authorInfo */}
          <Content id="displayName" style={statusStyle.displayName}>
              <p>{props.displayName}</p>
          </Content>

          {/* this section display the follower/following/post infomation from authorMeta */}
          <Content id="profileStatus" style={statusStyle.statusBar.overall}>
              <div style={statusStyle.statusBar.block}>
                  <p>
                      Post<br/>
                      <span style={statusStyle.statusBar.counter}>{props.postNum}</span>
                  </p>
              </div>
              <div style={statusStyle.statusBar.block}>
                  <p>
                      Follower<br/>
                      <span style={statusStyle.statusBar.counter}>{props.followerNum}</span>
                  </p>
              </div>
              <div style={statusStyle.statusBar.block}>
                  <p>
                      Following<br/>
                      <span style={statusStyle.statusBar.counter}>{props.followingNum}</span>
                  </p>
              </div>
          </Content>
      </Container>
  );
}

function ProfileInfoView(props) {
  const hasGithub = ((props.githubURL === undefined)||((props.githubURL === ""))) ? false : true;
  if (hasGithub) {
    var githubUsername = props.githubURL.replace("https://github.com/","");
  }

  const yonderBanner = (
      <div style={infoStyle.banner}>
          <div style={svgIconStyle.style}><YonderLogo svgScale={svgIconStyle.scale} /></div>
          <div><p>{props.UUID}</p></div>
      </div>
  );
  
  const githubBanner = (!hasGithub) ? null : (
      <div style={infoStyle.banner}>
          <div style={svgIconStyle.style}><GithubLogo svgScale={svgIconStyle.scale} /></div>
          <div><p>@{githubUsername}</p></div>
      </div>
  );

  return (!hasGithub) ? (
      <Container style={infoStyle.overall}>
          {yonderBanner}
      </Container>
  ) : (
      <Container style={infoStyle.overall}>
          {yonderBanner}
          {githubBanner}
      </Container>
  )
}

class ProfileDetail extends React.Component {
  render() {
      return (
          <Container>
              <ProfileStatusView 
                  displayName={this.props.displayName}
                  followingNum={this.props.followingNum}
                  followerNum={this.props.followerNum}
                  postNum={this.props.postNum}
              />
              <hr style={{...shadowDividorStyle, backgroundColor: "transparent", marginBottom: "0.5em", marginTop: "-32pt"}}></hr>
              <ProfileInfoView
                  UUID={this.props.UUID}
                  githubURL={this.props.githubURL}
                  githubUsername={this.props.githubUsername}
              />
          </Container>
      );
  }
}

export default ProfileDetail;


