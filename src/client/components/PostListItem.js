import React from 'react';

const PostListItem = ({ title, body, createdAt }) => {
    return (
        <div className="content-container-s">
            <h2>{title}</h2>
            <p>{body}</p>
            <p>{createdAt}</p>
        </div>
    );
}

export default PostListItem;