import React from 'react';

const Post = (props) => (
    <div className="panel panel-default post-body">
        <div className="panel-body" style={{ fontSize:`20px`, fontWeight:"700" }} >
            { props.postBody }
        </div>
    </div>
)

export default Post