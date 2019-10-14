import React, { useState, useEffect, useContext } from 'react';
import { AuthContext, AuthConsumer } from '../context/AuthContext';
import client from '../utils/mappersmith';
import ProfilePageCard from '../components/ProfilePageCard';
import PostListItem from '../components/PostListItem';

const ProfilePage = () => {

    const { currentCredentials } = useContext(AuthContext)

    const [postList, setPostList] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const posts = await client.Post.findAllByUserId({ userId: currentCredentials.id });
            const data = JSON.parse(posts.responseData);
            setPostList(data);
        }
        fetchPosts();
        
    }, []);


    return (
        <AuthConsumer>
        { ({ currentCredentials }) => (
            <div className="content-container-l">
                <div className="profile__container">
                    <ProfilePageCard {...currentCredentials}/>
                    <div className="profile__list-container">
                        <h2>My posts</h2>
                        <ul className="profile__list">
                            <li className="profile__list-item">
                            {
                                postList.map((post) => {
                                    return (
                                        <PostListItem key={post.id} {...post} />
                                    )
                                })
                            }
                            </li>
                        </ul>
                    </div>
                </div>
                
            </div>
        )}
        </AuthConsumer>
    );
};

export default ProfilePage;

