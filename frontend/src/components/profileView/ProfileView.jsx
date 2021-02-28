/*
Profile View, navigation drop down
NOTE:
    this code does not use redux, because i am an idiot and knows nothing
    will refactor it later
*/
import React, { useState } from 'react';
import { Content, Container, Button, Form } from "react-bulma-components";
import { YonderLogo, GithubLogo, EditButton } from "./ProfileViewSVG";

function ProfileStatusView(props) {
    // displayName
    // followingNum, followerNum, and postNum

    // styles
    const nameStyle = {
        textAlign: "center",
        fontSize: "3em",
        fontWeight: "350",
        color: "#505050",
        paddingBottom: "1em",
    }

    const statusStyle = {
        paddingBottom: "1em",
        display: "flex",
        justifyContent: "space-between",
        textAlign: "center",
        fontWeight: "400",
        fontSize: "1.2em",
        color: "#505050",
    }

    const statusBlockStyle = {
        width: "100%",
    }

    const statusNumStyle = {
        fontSize: "0.9em",
    }

    const profileStatusStyle = {
        paddingTop: "3em",
        paddingBottom: "1.5em",
    }

    // render
    return (
        <Container style={profileStatusStyle}>
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
        display: "block",
        display: "flex",
        alignItems: "center",
        whiteSpace: "nowrap",
        color: "#707070",
        overflow: "hidden",
    }

    const svgStyle = {
        verticleAlign: "middle",
    }

    const profileInfoStyle = {
        paddingTop: "3em",
        paddingBottom: "1.5em",
        width: "auto",
        flexDirection: "column",
        alignItems: "flex-start",

    }


    const hasGithub = (props.githubURL == "") ? false : true;

    const yonderBanner = (
        <div style={bannerStyle}>
            <div style={svgStyle}><YonderLogo svgScale="40" /></div>
            <div><p>{props.UUID}</p></div>
        </div>
    );
    
    const githubBanner = (!hasGithub) ? null : (
        <div style={bannerStyle}>
            <div style={svgStyle}><GithubLogo svgScale="40" /></div>
            <div><p>@{props.githubUsername}</p></div>
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
        width: "70pt",
        height: "22pt",
        fontSize: "1.3em",
        fontWeight: "300",
        border: "none",
        color: "white",
        backgroundColor: "#505050",
        // boxShadow: "1pt 1pt 2pt #B1B1B1",
    }

    const buttonsLayout = {
        display: "flex",
        justifyContent: "space-between",
        paddingLeft: "1em",
        paddingRight: "1em",
        paddingTop: "2em",
        paddingBottom: "1em",
        margin: "0",
    }

    return (
        <Container style={buttonsLayout}>
            <Button style={buttonStyle}>Friends</Button>
            <Button style={buttonStyle}>Followers</Button>
            <Button style={buttonStyle}>Inbox</Button>
        </Container>
    );
}

function EditProfileButton(props) {
    const buttonStyle = {
        padding: "1.2em",
        fill: "#505050",
    }
    return (
        <Container style={buttonStyle}>
            <a onClick={props.action}><EditButton svgScale="32"/></a>
        </Container>
    );
}

function Dividor() {
    const divStyle = {
        height: "1em",
        borderBottom: "0.1px #999999 dashed",
        marginLeft: "1em",
        marginRight: "1em",
    }
    return (
        <div style={divStyle}/>
    );
}

class ProfileEditForm extends React.Component {

    constructor(props) {
        super(props);

        // states
        this.state = {
            displayName: '',
            password: '',
            githubURL: '',
        }

        // styles
        this.buttonStyle = {
            width: "70pt",
            height: "22pt",
            fontSize: "1.3em",
            fontWeight: "300",
            border: "none",
            color: "white",
            backgroundColor: "#505050",
            // boxShadow: "1pt 1pt 2pt #B1B1B1",
        }

        this.buttonsLayout = {
            display: "flex",
            justifyContent: "space-between",
            paddingLeft: "1em",
            paddingRight: "1em",
            paddingTop: "2em",
            paddingBottom: "1em",
            margin: "0",
        }

        this.labelStyle = {

        }
    }

    onChange = (evt) => {
        // https://couds.github.io/react-bulma-components/?path=/story/form--handle-multiple-inputs
        const value = evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value;
        this.setState({
            [evt.target.name]: value,
        });
    }
    
    render() {
        const { displayName, password, githubURL } = this.state;
        return (
            <Container>
                <Container>
                    <YonderLogo svgScale="90"/>
                    <p>Edit your profile</p>
                </Container>
                <Dividor/>
                <Container>
                    <Form.Field>
                        <Form.Label sytle={this.labelStyle}>Display Name</Form.Label>
                        <Form.Control>
                            <Form.Input 
                                name="displayName" 
                                onChange={this.onChange} 
                                value={displayName} 
                                type="text" 
                                placeholder={this.props.displayName}
                            ></Form.Input>
                        </Form.Control>
                    </Form.Field>
                    <Form.Field>
                        <Form.Label sytle={this.labelStyle}>Password</Form.Label>
                        <Form.Control>
                            <Form.Input 
                                name="password" 
                                onChange={this.onChange} 
                                value={password} type="password" 
                                placeholder="Enter your new password"
                            ></Form.Input>
                        </Form.Control>
                    </Form.Field>
                </Container>
                <Dividor/>
                <Container>
                    <Form.Field>
                        <Form.Label sytle={this.labelStyle}>Github URL</Form.Label>
                        <Form.Control>
                            <Form.Input 
                                name="githubURL" 
                                onChange={this.onChange} 
                                value={githubURL} 
                                type="url" 
                                placeholder="Enter your github URL"
                            ></Form.Input>
                        </Form.Control>
                    </Form.Field>
                </Container>
                <Dividor/>
                <Container style={this.buttonsLayout}>
                    <Button onClick={this.props.onCancel} style={this.buttonStyle}>Cancel</Button>
                    <Button style={this.buttonStyle}>Confirm</Button>
                </Container>
            </Container>
        );
    }
}


class ProfileView extends React.Component {
    constructor(props) {
        super(props);
        
        // binding
        this.switchMode = this.switchMode.bind(this);

        // init state
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
            isViewMode: false,
        };

        // hard coded github username -> change later
        this.githubUsername = "joemama";

        // style
        this.boxStyle = {
            width: "325pt",
            fontSize: "1em",
            paddingLeft: "1.3em",
            paddingRight: "1.3em",
            paddingTop: "1.5em",
            margin: "0",
            fontFamily: "Segoe UI,Frutiger,Frutiger Linotype,Dejavu Sans,Helvetica Neue,Arial,sans-serif",
        }

        
    }

    switchMode() {
        // this function switch between edit and view mode
        if (this.state.isViewMode)
            this.setState({isViewMode: false});
        else
            this.setState({isViewMode: true});
    }

    renderView() {
        return (
            <Container style={this.boxStyle}>
                <ProfileStatusView 
                    displayName={this.state.authorMeta.displayName}
                    followingNum={this.state.authorInfo.followingNum}
                    followerNum={this.state.authorInfo.followerNum}
                    postNum={this.state.authorInfo.postNum}
                />
                <EditProfileButton action={this.switchMode} />
                <Dividor/>
                <ProfileInfoView
                    UUID={this.state.authorMeta.UUID}
                    githubURL={this.state.githubURL}
                    githubUsername={this.githubUsername}
                />
                <Dividor/>
                <ProfileButtons/>
                
            </Container>
        );
    }

    renderEdit() {
        return (
            <Container style={this.boxStyle}>
                <ProfileEditForm onCancel={this.switchMode} displayName={this.state.authorMeta.displayName} />
            </Container>
        ); 
    }

    render() {
        return (this.state.isViewMode) ? this.renderView() : this.renderEdit();
    }
}

export default ProfileView;