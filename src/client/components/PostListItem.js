import React, { Fragment } from 'react';

const PostListItem = ({ title, body, createdAt }) => {
    return (
        <Fragment>
            <h3>{title}</h3>
            <p>{body}</p>
            <p>{createdAt}</p>
        </Fragment>
    );
}

export default PostListItem;