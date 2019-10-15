import React from 'react';
import moment from 'moment';

const PostListItem = ({ title, body, createdAt }) => {

    const formattedDate = moment(createdAt).format('MMMM Do, YYYY')

    return (
        <div className="profile__list-item">
            <h3>{title}</h3>
            <p>{body}</p>
            <p>{formattedDate}</p>
        </div>
    );
}

export default PostListItem;