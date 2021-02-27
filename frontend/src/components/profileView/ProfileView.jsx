/*
Profile View, navigation drop down
NOTE:
    this code does not use redux, because i am an idiot and knows nothing
    will refactor it later
*/
import React, { useState } from 'react';
import { Box, Content, Container, Button } from "react-bulma-components";
import { YonderLogo, GithubLogo } from "./ProfileViewSVG";

function ProfileStatusView(props) {
    // displayName
    // followingNum, followerNum, and postNum

    // styles
    const nameStyle = {
        textAlign: "center",
        fontSize: "2em",
        fontWeight: "400",
        color: "#505050",
    }

    const statusStyle = {
        padding: "0.5em",
        display: "flex",
        justifyContent: "space-between",
        textAlign: "center",
        fontWeight: "400",
        color: "#505050",
    }

    const statusBlockStyle = {
        width: "100%",
    }

    const statusNumStyle = {
        fontSize: "0.9em",
    }

    // render
    return (
        <Container>
            {/* this section display the displayName from authorInfo */}
            <Content id="displayName" style={nameStyle}>
                <p>{props.displayName}</p>
            </Content>

            {/* this section display the follower/following/post infomation from authorMeta */}
            <Content id="profileStatus" style={statusStyle}>
                <div style={statusBlockStyle}>
                    <p>
                        Post<br/>
                        <span style={statusNumStyle}>{props.postNum}</span>
                    </p>
                </div>
                <div style={statusBlockStyle}>
                    <p>
                        Follower<br/>
                        <span style={statusNumStyle}>{props.followerNum}</span>
                    </p>
                </div>
                <div style={statusBlockStyle}>
                    <p>
                        Following<br/>
                        <span style={statusNumStyle}>{props.followingNum}</span>
                    </p>
                </div>
            </Content>
        </Container>
    );
}

function ProfileInfoView(props) {
    // should be able to obtain github username from github url, but i dont know how :(. so empty for now
    // notes: since only github info is optional. I choice to hard coded 2 state of the view - with/without github info
    //        i may rewrite it later.

    // default case: github is not included

    // styles
    const bannerStyle = {
        height: "4em",
        display: "flex",
        alignItems: "center",
        whiteSpace: "nowrap",
        fontSize: "0.8em",
        color: "#707070",
        overflow: "hidden",
    }

    const profileInfoStyle = {
        paddingTop: "2em",
        paddingBottom: "1.5em",
        width: "20em",
        flexDirection: "column",
        alignItems: "flex-start",

    }


    const hasGithub = (props.githubURL == "") ? false : true;

    const yonderBanner = (
        <div style={bannerStyle}>
            <div><YonderLogo /></div>
            <div><p>{props.UUID}</p></div>
        </div>
    );
    
    const githubBanner = (!hasGithub) ? null : (
        <div style={bannerStyle}>
            <div><GithubLogo /></div>
            <div><p><a href={props.githubURL}>@{props.githubUsername}</a></p></div>
        </div>
    );

    return (!hasGithub) ? (
        <Container style={profileInfoStyle}>
            {yonderBanner}
        </Container>
    ) : (
        <Container style={profileInfoStyle}>
            {yonderBanner}
            {githubBanner}
        </Container>
    )
}

function ProfileButtons(props) {
    // style
    const buttonStyle = {
        width: "4em",
        height: "2.5em",
        fontSize: "1em",
        fontWeight: "400",
        border: "none",
        color: "white",
    }

    const buttonsLayout = {
        display: "flex",
        justifyContent: "space-between",
        paddingLeft: "1em",
        paddingRight: "1em",
        paddingBottom: "0.5em",
        margin: "0",
    }

    return (
        <Container style={buttonsLayout}>
            <Button style={buttonStyle} color="primary">Edit</Button>
            <Button style={buttonStyle} color="primary">Follow</Button>
            <Button style={buttonStyle} color="primary">Logout</Button>
        </Container>
    );
}

class ProfileView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {          // this is the mockupdata of author info and meta data
            authorMeta: {
                displayName: "Mark Twain",
                UUID: "d29e3c6c-7669-11eb-9439-0242ac130002",
                githubURL: "https://github.com/gengyuanhuang",
            },
            authorInfo: {
                followingNum: 82,
                followerNum: 32,
                postNum: 202,
            },
        };

        // hard coded github username -> change later
        this.githubUsername = "joemama";

        // style
        this.boxStyle = {
            width: "auto",
            fontSize: "1.0em",
            paddingLeft: "1.5em",
            paddingRight: "1.5em",
            paddingTop: "1.5em",
            margin: "0",
        }
        this.divStyle = {
            height: "1em",
            borderBottom: "0.1px #707070 solid",
            marginLeft: "1em",
            marginRight: "1em",
        }
    }

    render() {
        return (
            <Container style={this.boxStyle}>
                <ProfileStatusView 
                    displayName={this.state.authorMeta.displayName}
                    followingNum={this.state.authorInfo.followingNum}
                    followerNum={this.state.authorInfo.followerNum}
                    postNum={this.state.authorInfo.postNum}
                />
                <div style={this.divStyle}/>
                <ProfileInfoView
                    UUID={this.state.authorMeta.UUID}
                    githubURL={this.state.githubURL}
                    githubUsername={this.githubUsername}
                />
                <ProfileButtons/>
            </Container>
        );
    }
}

export default ProfileView;