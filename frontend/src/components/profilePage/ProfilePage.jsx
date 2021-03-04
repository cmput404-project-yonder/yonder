import React from "react";

import { Section,Container,Columns,Content } from "react-bulma-components";
import PostList from "../stream/posts/PostList";

import { ProfileIcon } from "./ProfileViewSVG";
import { color } from "./styling";
import Dividor from "./Dividor";

// buttons
import FollowButton from "./buttons/followButton";
import FriendButton from "./buttons/friendButton";


var postsMockup = [
    {
        title: "The Adventures of Huckleberry Finn",
        published: new Date().toLocaleTimeString(),
        description: "A story set in a nineteenth-century Mississippi River town",
        content:
        " A nineteenth-century boy from a Mississippi River town recounts his adventures as he travels down the river with a runaway slave, encountering a family involved in a feud, two scoundrels pretending to be royalty, and Tom Sawyer's aunt who mistakes him for Tom",
        author: {
        id: 1,
        display_name: "mark_twain",
        },
    },
];

var authorMockup = {
    displayName: "Mark Twain",
    followingNum: "64",
    followerNum: "32",
    postNum: "20",
}

var profileIconStyle = {
    scale: "80",
    style: {
        padding: "1.2em",
        fill: color.baseRed,
        transform: "rotate(-20deg)",
    }
}

var profilePageStyle = {
    display: "flex",
    justifyContent: "space-around",
}

var profileShowStyle = {
    width: "25em",

}

var buttonLayoutStyle = {
    paddingTop: "2em",
    display: "flex",
}

var statusStyle = {
    overall: {
        paddingTop: "0em",
        paddingBottom: "0em",
    },
    displayName: {
            textAlign: "center",
            paddingBottom: "0em",
            fontSize: "2.8em",
    },
    statusBar: {
        overall: {
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: "2em",
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

function ProfileStatusView(props) {
    // from profileView/profileView.jsx
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

class ProfileShow extends React.Component {

    constructor(props) {
        super(props);
    }

    clickFollow() {
        // onClick event handler for follow button
    }

    clickFriend() {
        // onClick event handler for friend button
    }


    render() {
        return (
            <Container style={profileShowStyle}>
                <Container style={profileIconStyle.style}><ProfileIcon svgScale={profileIconStyle.scale}/></Container>
                <ProfileStatusView 
                    displayName={authorMockup.displayName}
                    followerNum={authorMockup.followerNum}
                    followingNum={authorMockup.followingNum}
                    postNum={authorMockup.postNum}
                />
                <Dividor/>
                <Container style={buttonLayoutStyle}>
                    <FollowButton action={this.clickFollow}/>
                    <FriendButton action={this.clickFriend}/>
                </Container>
            </Container>    
        );
    }
}


class ProfilePage extends React.Component {
    render() {
        const posts = postsMockup;

        // if (this.props.loading) {
        //   return (
        //     <div class="pageloader is-active">
        //       <span class="title">Loading</span>
        //     </div>
        //   );
        // }
    
        return (
            <Container style={profilePageStyle}>
                <Section>
                    <ProfileShow/>
                </Section>
                <Section>
                    <Container fluid>
                        <Columns centered>
                            <Columns.Column>
                                <PostList posts={posts} />
                            </Columns.Column>
                        </Columns>
                    </Container>
                </Section>
            </Container>
        );
    }
}

export default ProfilePage;