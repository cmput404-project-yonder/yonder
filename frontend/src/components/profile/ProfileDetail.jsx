import React from "react";
import { Content, Container } from "react-bulma-components";
import { YonderLogo, GithubLogo } from "./ProfileIcons";
import { ProfileIcon } from "../profile/ProfileIcons";

import { style, color } from "./styling";

var statusStyle = {
  overall: {},
  displayName: Object.assign({}, style.text.heading, {
    textAlign: "center",
    paddingBottom: "1em",
    fontSize: "2.8em",
  }),
  statusBar: {
    overall: {
      display: "flex",
      justifyContent: "space-between",
      paddingBottom: "1em",
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

export function ProfileDetail(props) {
  return (
    <Container style={statusStyle.overall}>
      <div style={{ fill: color.baseRed }}>
        <ProfileIcon svgScale={80} />
      </div>
      <Content id="displayName" style={statusStyle.displayName}>
        <p>{props.displayName}</p>
      </Content>

      <Content id="profileStatus" style={statusStyle.statusBar.overall}>
        <div style={statusStyle.statusBar.block}>
          <p>
            Post
            <br />
            <span style={statusStyle.statusBar.counter}>{props.postNum}</span>
          </p>
        </div>
        <div style={statusStyle.statusBar.block}>
          <p>
            Follower
            <br />
            <span style={statusStyle.statusBar.counter}>{props.followerNum}</span>
          </p>
        </div>
        <div style={statusStyle.statusBar.block}>
          <p>
            Following
            <br />
            <span style={statusStyle.statusBar.counter}>{props.followingNum}</span>
          </p>
        </div>
      </Content>
    </Container>
  );
}

function ProfileInfoView(props) {
  const hasGithub = props.githubURL === "" ? false : true;

  const yonderBanner = (
    <div style={infoStyle.banner}>
      <div style={svgIconStyle.style}>
        <YonderLogo svgScale={svgIconStyle.scale} />
      </div>
      <div>
        <p>{props.UUID}</p>
      </div>
    </div>
  );

  const githubBanner = !hasGithub ? null : (
    <div style={infoStyle.banner}>
      <div style={svgIconStyle.style}>
        <GithubLogo svgScale={svgIconStyle.scale} />
      </div>
      <div>
        <p>@{props.githubUsername}</p>
      </div>
    </div>
  );

  return !hasGithub ? (
    <Container style={infoStyle.overall}>{yonderBanner}</Container>
  ) : (
    <Container style={infoStyle.overall}>
      {yonderBanner}
      {githubBanner}
    </Container>
  );
}

export default ProfileDetail;
