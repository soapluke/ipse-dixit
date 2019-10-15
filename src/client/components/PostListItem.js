import React from 'react';
import moment from 'moment';

const PostListItem = ({ title, body, createdAt }) => {

    const formattedDate = moment(createdAt).format('MMMM Do, YYYY, HH:mm')

    return (
        <div className="list__item">
            <h3>{title}</h3>
            <p className="list__body">{body}</p>
            <p className="list__subtitle">{formattedDate}</p>
        </div>
    );
}

export default PostListItem;