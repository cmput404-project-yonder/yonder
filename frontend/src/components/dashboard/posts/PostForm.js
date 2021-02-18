import React, { Component } from "react";
import MarkDown from "react-markdown";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Checkbox from "@material-ui/core/Checkbox";

import Post from "./PostBody";

const CheckboxPlainText = withStyles( {
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />)

class PostForm extends Component {
    constructor(props) {
        super(props);

        this.addPost = this.addPost.bind(this);
        this.addPostBody = this.addPostBody.bind(this);
        this.handlePostEditorInputChange = this.handlePostEditorInputChange.bind(this);
        this.handlePostBodyInputChange = this.handlePostBodyInputChange.bind(this);
        
        
        this.state = {
            posts: [],
            newPost: '',
            newPostBody: '',
        }
    }

    handlePostEditorInputChange(event) {
        this.setState({
            newPost: event.target.value,
        })
    }

    handlePostBodyInputChange(event) {
        this.setState({
            newPostBody: event.target.value
        })
    }

    addPost() {
        const newState = Object.assign({}, this.state);
        newState.posts.push(this.state.newPost);
        newState.newPost = '';
        this.setState(newState);
    }

    addPostBody() {
        const newState = Object.assign({}, this.state);
        newState.posts.push(this.state.newPostBody);
        newState.newPostBody = '';
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

                <label style={{ fontSize:`3vh`, fontWeight:"bold"}} >
                    Title
                </label>
                <textarea onKeyPress={e => {
                    if(e.key === 'Enter')
                    e.preventDefault()
                }} 
                maxLength="30" cols={1} value={this.state.newPost} id="textHeader" 
                style={{ overflowY:"hidden", whiteSpace:"nowrap", resize:"none", width:window.innerWidth/1.07, height:`50px`, padding:`10px`, outline:"none" }}  
                onChange={this.handlePostEditorInputChange}/>
                
                <label style={{ fontSize:`3vh`, fontWeight:"bold" }} >Body</label>


                <div className="panel panel-default post-editor" >
                    <div className="panel-title" style={{ width:window.innerWidth/1.07}} >

                        <textarea id="textBody" value={this.state.newPostBody} 
                        onChange={this.handlePostBodyInputChange} 
                        style={{ resize:"none", width:window.innerWidth/1.07, height:`500px`, padding:`20px`, outline:"none" }}/>

                        <button className="btn btn-success post-editor-button" style={{ float:"right", width:100 }} onClick={this.addPostBody, this.addPost} >Post</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default PostForm