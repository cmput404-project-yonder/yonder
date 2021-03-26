import React from "react";
import { Content, Container, Button } from "react-bulma-components";
import { YonderLogo, GithubLogo } from "./ProfileIcons";
import EditButton from "./buttons/EditButton";
import Dividor from "./Dividor";

import { style, color } from "./styling";


// local styling of this component
var buttonStyleGeneric = style.button.style.generic;
var buttonStyleFocus = style.button.style.focus;
var buttonsLayout = style.button.layout.horizontalBetween;

var statusStyle = {
  overall: {},
  displayName: Object.assign({}, style.text.heading, {
    textAlign: "center",
    paddingBottom: "0.5em",
    paddingTop: "1em",
    fontSize: "2.8em",
    fontWeight: "300",
  }),
  statusBar: {
    overall: {
      display: "flex",
      justifyContent: "space-between",
      paddingBottom: "2.5em",
    },
    block: {
      textAlign: "center",
      fontWeight: "400",
      fontSize: "1.2em",
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
    paddingTop: "3em",
    paddingBottom: "1.5em",
    width: "auto",
  },
  banner: {
    display: "flex",
    alignItems: "center",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
};

var svgIconStyle = {
  scale: "40",
  style: {
    fill: color.baseBlack,
    padding: "1.1em",
  },
};

// export function ProfileDetail(props) {
//   return (
//     <Container style={statusStyle.overall}>
//       <Content id="displayName" style={statusStyle.displayName}>
//         <p>{props.displayName}</p>
//       </Content>

//       <Content id="profileStatus" style={statusStyle.statusBar.overall}>
//         <div style={statusStyle.statusBar.block}>
//           <p>
//             Post
//             <br />
//             <span style={statusStyle.statusBar.counter}>{props.postNum}</span>
//           </p>
//         </div>
//         <div style={statusStyle.statusBar.block}>
//           <p>
//             Follower
//             <br />
//             <span style={statusStyle.statusBar.counter}>{props.followerNum}</span>
//           </p>
//         </div>
//         <div style={statusStyle.statusBar.block}>
//           <p>
//             Following
//             <br />
//             <span style={statusStyle.statusBar.counter}>{props.followingNum}</span>
//           </p>
//         </div>
//       </Content>
//     </Container>
//   );
// }

// function ProfileInfoView(props) {
//   const hasGithub = props.githubURL === "" ? false : true;

//   const yonderBanner = (
//     <div style={infoStyle.banner}>
//       <div style={svgIconStyle.style}>
//         <YonderLogo svgScale={svgIconStyle.scale} />
//       </div>
//       <div>
//         <p>{props.UUID}</p>
//       </div>
//     </div>
//   );

//   const githubBanner = !hasGithub ? null : (
//     <div style={infoStyle.banner}>
//       <div style={svgIconStyle.style}>
//         <GithubLogo svgScale={svgIconStyle.scale} />
//       </div>
//       <div>
//         <p>@{props.githubUsername}</p>
//       </div>
//     </div>
//   );

//   return !hasGithub ? (
//     <Container style={infoStyle.overall}>{yonderBanner}</Container>
//   ) : (
//     <Container style={infoStyle.overall}>
//       {yonderBanner}
//       {githubBanner}
//     </Container>
//   );
// }

// export default ProfileDetail;



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
  const hasGithub = (props.githubURL == "") ? false : true;

  const yonderBanner = (
      <div style={infoStyle.banner}>
          <div style={svgIconStyle.style}><YonderLogo svgScale={svgIconStyle.scale} /></div>
          <div><p>{props.UUID}</p></div>
      </div>
  );
  
  const githubBanner = (!hasGithub) ? null : (
      <div style={infoStyle.banner}>
          <div style={svgIconStyle.style}><GithubLogo svgScale={svgIconStyle.scale} /></div>
          <div><p>@{props.githubUsername}</p></div>
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
              <Dividor/>
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


