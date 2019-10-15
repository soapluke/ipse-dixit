import React from 'react';
import { AuthConsumer } from '../context/AuthContext';
import ProfilePageCard from '../components/ProfilePageCard';
import PostList from '../components/PostList';

const ProfilePage = () => {

    return (
        <AuthConsumer>
        { ({ currentCredentials }) => (
            <div className="content-container-l">
                <div className="profile__container">
                    <ProfilePageCard {...currentCredentials}/>
                    <PostList />
                </div>
                
            </div>
        )}
        </AuthConsumer>
    );
};

export default ProfilePage;

