import React from 'react';
import PostListItem from './PostListItem';

const PostList = (props) => {
    return (
        <div className="content-container-s">
                <ul style="list-style-type:none;">
                    {
                        props.surveys.map((survey) => {
                            return (
                                <li>
                                    <PostListItem key={post.ID} {...post} />
                                </li>
                            )
                        })
                    }
                </ul>

        </div>
    );
};

export default PostList;