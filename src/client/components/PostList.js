import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import client from '../utils/mappersmith';
import PostListItem from './PostListItem';
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';

const PostList = () => {

    const { currentCredentials } = useContext(AuthContext)

    const [postList, setPostList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            const posts = await client.Post.findAllByUserId({ userId: currentCredentials.id });
            const data = JSON.parse(posts.responseData);
            setPostList(data);
            setLoading(false)
        }
        fetchPosts();
        
    }, []);

    return (
        <div className="profile__list-container">
            <h2>My posts</h2>
            <ul className="profile__list">
                <li>
                { loading ? 
                    <ClipLoader
                        css={css}
                        sizeUnit={"px"}
                        size={35}
                        color={'#48A9A6'}
                    />
                     :
                    postList.map((post) => {
                        return (
                            <PostListItem key={post.id} {...post} />
                        )
                    })
                }
                </li>
            </ul>
        </div>
    );
};

export default PostList;