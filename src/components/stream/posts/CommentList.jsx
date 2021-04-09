import React, { useState } from 'react';
import SelectedPost from './SelectedPost';

function CommentList(commentData) {
    const commentList = [].concat(commentData["commentData"]);
    console.log(commentData);
    
    const listItem = commentList.map((commentObj) => 
        <p 
            key={commentObj.comment} 
            style={{ borderBottomWidth: `1px`, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, borderStyle: 'dashed',
            marginTop: `3%`, paddingBottom: `4%` }}
            >
            {commentObj.comment}
            
        </p>
        );
    return (
        <div>
            {
                listItem
            }
        </div>
    )
}

export default CommentList;