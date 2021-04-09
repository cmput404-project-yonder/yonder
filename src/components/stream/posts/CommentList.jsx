import React, { Component } from 'react';

class CommentList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            commentList: [{
                comment: "",
                commentType: "text/markdown",
            }]
        }
    }

    

    render() {
        return (
            <div>
                Rendering comment list
            </div>
        );
    }
}

export default CommentList;