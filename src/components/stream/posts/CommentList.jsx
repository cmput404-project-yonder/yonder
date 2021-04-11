import React, { useState } from 'react';
import dateFormat from 'dateformat';
import Pagination from './Pagination';

function CommentList(commentData) {
    const commentList = [].concat(commentData["commentData"]);
    const postAuthorName = commentData["postAuthorName"].displayName;
    const [currentPage, setCurrentPage] = useState(1);
    const [commentsPerPage] = useState(5);
    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentPosts = commentList.slice(indexOfFirstComment, indexOfLastComment);
    
    const displayFiveItem = currentPosts.map((commentObj) => 
        <div
            key={commentObj.comment}
            style={{ borderBottomWidth: `0px`, borderTopWidth: `1px`, borderLeftWidth: `0px`, borderRightWidth: `0px`, borderStyle: 'dashed',
            marginTop: `3%`, paddingTop:`3%`, overflowWrap: 'break-word' }}
            >
            <p style={{ float:"right", marginRight:`2%`, fontSize:`13px`, position:"relative", bottom:`10px` }}>
                by {commentObj.author.displayName}
            </p>
            <div style={{ position:'relative' }}>
                <p style={{ textAlign:"left", fontSize:`30px` }}>
                    {commentObj.comment}
                </p>
                <p style={{ textAlign:"right", fontSize:`13px`, paddingRight:`2%`, marginBottom:`2%` }}>
                    {dateFormat(commentObj.published, "dddd, mmmm dS, yyyy, h:MM TT")}
                </p>
            </div>
        </div>
    );

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const displayPagination = (displayList) => {
        return (
            <div>
                {displayList}
                <Pagination commentsPerPage={commentsPerPage} totalComments={commentList.length} paginate={paginate} />
            </div>
        )
    }

    const displayListItem = commentList.map((commentObj) => 
        <div
            key={commentObj.comment} 
            style={{ borderBottomWidth: `0px`, borderTopWidth: `1px`, borderLeftWidth: `0px`, borderRightWidth: `0px`, borderStyle: 'dashed',
            marginTop: `3%`, paddingTop:`3%`, overflowWrap: 'break-word' }}
            >
            <p style={{ float:"right", marginRight:`2%`, fontSize:`13px`, position:"relative", bottom:`10px` }}>
                by {commentObj.author.displayName}
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
    );

    const needPagination = (alist) => {
        if (alist.length > 5) {
            return displayPagination(displayFiveItem)
        }
        else {
            return displayListItem;
        }
    }

    return (
        <div>
            {needPagination(commentList)}
        </div>
    )
}

export default CommentList;