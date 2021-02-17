import React, { Component } from 'react';
import Post from "../dashboard/Post";

class PostEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newPostBody: '',
        };

        this.handlePostEditorInputChange = this.handlePostEditorInputChange.bind(this);
        this.createPost = this.createPost.bind(this);

    }

    handlePostEditorInputChange(event) {
        this.setState({
            newPostBody: event.target.value
        });
    }

    createPost() {
        this.props.addPost(this.state.newPostBody);
        this.setState({
            newPostBody: '',
        });
    }

    render() {
        return (
            <div className="panel panel-default post-editor">
                <div className="panel-body" style={{ width:window.innerWidth/2, paddingTop: `10px` }} >
                    <Post/>
                    <textarea className="form-control post-editor-input" style={{ resize:"none", width:window.innerWidth/2, height:200 }} 
                    value={this.state.newPostBody} onChange={this.handlePostEditorInputChange}/><br></br>
                    <button className="btn btn-success post-editor-button" style={{ float:"right", width:100 }} onClick={this.createPost} >Post</button>
                </div>
            </div>
        )
    }
}

export default PostEditor