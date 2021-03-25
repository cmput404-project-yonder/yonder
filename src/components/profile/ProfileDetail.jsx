import React from "react";
import { Content, Container } from "react-bulma-components";
import { YonderLogo, GithubLogo } from "./ProfileIcons";
import { ProfileIcon } from "../profile/ProfileIcons";

import { style, color } from "./styling";
import { statusStyle, infoStyle, svgIconStyle } from "../stream/posts/StyleComponents";

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
