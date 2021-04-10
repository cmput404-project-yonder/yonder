import React from 'react';
import dateFormat from 'dateformat';

function CommentList(commentData) {
    const commentList = [].concat(commentData["commentData"]);
    // console.log("CommentName:",postAuthorName);
    const postAuthorName = commentData["postAuthorName"].displayName;
    console.log("NAME:", postAuthorName);
    console.log("commentData:",commentData);
    
    const listItem = commentList.map((commentObj) => 
        <div
            key={commentObj.comment} 
            style={{ borderBottomWidth: `0px`, borderTopWidth: `1px`, borderLeftWidth: `0px`, borderRightWidth: `0px`, borderStyle: 'dashed',
            marginTop: `3%`, paddingTop:`3%`, overflowWrap: 'break-word' }}
            >
            <p style={{ float:"right", marginRight:`2%`, fontSize:`13px`, position:"relative", bottom:`10px` }}>
                by {postAuthorName}
            </p>
            <div style={{ position:'relative' }}>
                <p style={{ textAlign:"left", fontSize:`30px` }}>
                    {commentObj.comment}
                </p>
                <p style={{ textAlign:"right", fontSize:`13px`, paddingRight:`2%` }}>
                    {dateFormat(commentObj.published, "dddd, mmmm dS, yyyy, h:MM TT")}
                </p>
            </div>
        </div>
        ).reverse();
    return (
        <div>
            {
                listItem
            }
        </div>
    )
}

export default CommentList;