/*
a container of profileView and profileEdit
    notes:
        this container is used to defines the overall size/styling of its children components
        and controls overall flow
*/
import React from "react";
import ProfileEdit from "./ProfileEdit";
import ProfileView from "./ProfileView";
import { Container } from "react-bulma-components";
import { style } from "./styling";

// local styling
var boxStyle = Object.assign(
    {}, style.text.body,
    {
        width: "325pt",
        paddingLeft: "1.3em",
        paddingRight: "1.3em",
        paddingTop: "1.5em",
        paddingBottom: "0.2em",
        margin: "0",    
    }
)

class ProfileControl extends React.Component {
    constructor(props) {
        super(props);
        
        // binding
        this.switchMode = this.switchMode.bind(this);

        // init state
        // this is a mockup data
        this.state = {
            authorInfo: {
                authorModel: {
                    displayName: "Mark Twain",
                    UUID: "d29e3c6c-7669-11eb-9439-0242ac130002",
                    githubURL: "https://github.com/somethingsomething123",
                },
                authorMeta: {
                    followingNum: 82,
                    followerNum: 32,
                    postNum: 202,
                    githubUsername: "marktwain"
                },
            },
            isViewMode: true,
        };
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
            <Container style={boxStyle}>
                <ProfileView 
                    action={this.switchMode}
                    displayName={this.state.authorInfo.authorModel.displayName}
                    UUID={this.state.authorInfo.authorModel.UUID}
                    githubURL={this.state.authorInfo.authorModel.githubURL}
                    githubUsername={this.state.authorInfo.authorMeta.githubUsername}
                    followerNum={this.state.authorInfo.authorMeta.followerNum}
                    followingNum={this.state.authorInfo.authorMeta.followingNum}
                    postNum={this.state.authorInfo.authorMeta.postNum}
                />
            </Container>
        );
    }

    renderEdit() {
        return (
            <Container style={boxStyle}>
                <ProfileEdit 
                    onCancel={this.switchMode} 
                    displayName={this.state.authorInfo.authorModel.displayName} 
                />
            </Container>
        ); 
    }

    render() {
        return (this.state.isViewMode) ? this.renderView() : this.renderEdit();
    }
}

export default ProfileControl;