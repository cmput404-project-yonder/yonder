// wrap around an inbox post, will only display if it is valid
// default render nothing

import React from "react";
import { connect } from "react-redux";
import Post from "./Post";
import { checkInboxPostValid } from "./PostActions";

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
                } else {
                    this.setState({truePost: data})
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
            return (<span></span>); // dead af
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