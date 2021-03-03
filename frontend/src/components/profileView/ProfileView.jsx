/*
Profile View, navigation drop down

Properties:
    props.action - EditButton's onClick event handler
    props.displayName - current displayName of the author
    props.followingNum
    props.followerNum
    props.postNum
    props.UUID
    props.githubURL
    props.githubUsername
*/

import React from 'react';
import { Content, Container, Button } from "react-bulma-components";
import { YonderLogo, GithubLogo } from "./ProfileViewSVG";
import EditButton from "./EditButton";
import Dividor from "./Dividor";

import { style, color } from "./styling"

// local styling of this component
var buttonStyleGeneric = style.button.style.generic;
var buttonStyleFocus = style.button.style.focus;
var buttonsLayout = style.button.layout.horizontalBetween;

var statusStyle = {
    overall: {
        paddingTop: "3em",
        paddingBottom: "1.5em",
    },
    displayName: Object.assign(
        {}, style.text.heading,
        {
            textAlign: "center",
            paddingBottom: "1em",
            fontSize: "2.8em",
        }
    ),
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
        }
    }
}

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
    }
}

var svgIconStyle = {
    scale: "40",
    style: {
        fill: color.baseBlack,
        padding: "1.1em",
    }
}

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

class ProfileView extends React.Component {
    render() {
        return (
            <Container>
                <ProfileStatusView 
                    displayName={this.props.displayName}
                    followingNum={this.props.followingNum}
                    followerNum={this.props.followerNum}
                    postNum={this.props.postNum}
                />
                <EditButton action={this.props.action} />
                <Dividor/>
                <ProfileInfoView
                    UUID={this.props.UUID}
                    githubURL={this.props.githubURL}
                    githubUsername={this.props.githubUsername}
                />
                <Dividor/>
                <Container style={buttonsLayout}>
                    <Button style={buttonStyleGeneric}>Followers</Button>
                    <Button style={buttonStyleGeneric}>Inbox</Button>
                    <Button style={buttonStyleFocus}>Logout</Button>
                </Container>
            </Container>
        );
    }
}

export default ProfileView;