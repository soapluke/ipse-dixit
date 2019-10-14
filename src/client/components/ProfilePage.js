import React, { useState, useEffect } from 'react';
import { AuthConsumer } from '../context/AuthContext';
import ProfilePageCard from '../components/ProfilePageCard';

const ProfilePage = () => {
    return (
        <AuthConsumer>
        { ({ currentCredentials }) => (
            <div className="content-container-l">
                <div className="profile__container">
                    <ProfilePageCard {...currentCredentials}/>
                    <div className="profile__list">
                        <h3>My posts</h3>
                    </div>
                </div>
                
            </div>
        )}
        </AuthConsumer>
    );
};

export default ProfilePage;

/**<ul style="list-style-type:none;">
{
    props.posts.map((post) => {
        return (
            <li>
                <PostListItem key={post.ID} {...post} />
            </li>
        )
    })
}
</ul>*/