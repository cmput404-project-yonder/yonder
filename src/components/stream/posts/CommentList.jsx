import React, { useState } from 'react';
import SelectedPost from './SelectedPost';

function CommentList(commentData) {
    console.log("commentList:",commentData);
    return (
        <div>
            {
                // commentData.map(comment => <p>{comment}</p>)
                commentData[0]
            }
        </div>
    )
}

export default CommentList;