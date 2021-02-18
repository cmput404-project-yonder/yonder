import React from 'react';

const PostHeader = (props) => (
    <div className="panel panel-default post-header">
        <div className="panel-header" style={{ fontSize:`20px`, fontWeight:"700" }} >
            { props.postHeader }
        </div>
    </div>
)

export default PostHeader