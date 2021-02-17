import React, { Component } from "react";
import Post from '../dashboard/Post';
import PostEditor from '../dashboard/PostEditor';

class ThreadDisplay extends Component {
    constructor(props) {
        super(props);

        this.addPost = this.addPost.bind(this);
        
        this.state = {
            posts: [],
        }
    }

    addPost(newPostBody) {
        const newState = Object.assign({}, this.state);
        newState.posts.push(newPostBody);
        this.setState(newState);        
    }

    render() {
        return (
            <div>
            { this.state.posts.map((postBody, index) => {
                return (
                    <Post key={index} postBody={postBody} />
                )
            })}
            <PostEditor addPost={this.addPost}/>
        </div>
        );
    }
}

export default ThreadDisplay