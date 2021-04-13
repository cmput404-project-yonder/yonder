// wrap around an inbox post, will only display if it is valid
// default render nothing

import React from "react";
import { connect } from "react-redux";
import Post from "./Post";
import { checkInboxPostValid } from "./PostActions";
import { DeletedPostIcon } from "../../../styling/svgIcons";
import { Card, Container } from "react-bulma-components";
import { postStyle } from "../../../styling/StyleComponents";
import { color } from "../../../styling/ColorFontConfig";

class InboxPostWrapper extends React.Component {
    
    constructor(props) {
        super(props);
        this.inboxSelfUpdateInterval = 30 //seconds
        this.interval = null;
        this.dead = false;                  // dead post will not be polled untill compoents props.post changes

        this.state = {
            truePost: null
        }
    }

    initPost = () => {
        // get newest version of the post
        // if post is dead, it will set it to null
        if (this.dead === false) {
            this.props.checkInboxPostValid(this.props.post, (data)=> {
                if (data === null) {
                    this.dead = true;
                    this.setState({truePost: data});        // triggers one update
                } else {
                    this.setState({truePost: data});
                }
            }); 
        }
    }

    componentDidMount() {
        this.initPost();
        this.interval = setInterval(this.initPost, this.inboxSelfUpdateInterval * 1000);
    }

    componentDidUpdate(prevProps) {
        // console.log("it happened");
        if (prevProps.post.id !== this.props.post.id) {
            // post changed. update its value
            clearInterval(this.interval);
            this.dead = false;
            this.initPost();
            this.interval = setInterval(this.initPost, this.inboxSelfUpdateInterval * 1000);
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        if (this.state.truePost === null) {
            if (this.dead) {
                return (
                    <Card style={{...postStyle,...this.props.style}} className={(this.props.interactive)?"animate__animated animate__headShake":""} key={this.props.post.id}>
                        <Container style={{margin: "1em", marginLeft: "2em",fill: color.baseLightGrey, color: color.baseLightGrey}}>
                        <DeletedPostIcon svgScale={80}/>
                        <Container style={{float: "right", fontSize: "0.9em", marginTop: "0.8em", marginRight: "1.1em"}}>
                            <p> This post was deleted by original author</p>
                            <p>{this.props.post.author.id}</p>
                        </Container>
                        </Container>
                    </Card>
                )                
            } else {
                return (<span></span>)
            }

        } else {
            return (
                <Post
                    interactive={this.props.interactive} 
                    post={this.state.truePost} 
                    updatePost={this.props.updatePost} 
                    deletePost={this.props.deletePost} 
                    likePost={this.props.likePost} 
                    sharePost={this.props.sharePost}
                />
            )
        }
    }
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, {checkInboxPostValid})(InboxPostWrapper);