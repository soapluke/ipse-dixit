import React, { useState, useEffect, useContext } from 'react';
import { AuthContext, AuthConsumer } from '../context/AuthContext';
import client from '../utils/mappersmith';
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

