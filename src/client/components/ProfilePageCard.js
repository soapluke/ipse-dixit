import React from 'react';
import noUserImg from '../assets/noUserImg.svg';

const ProfilePageCard = ({ username, email }) => {
    return (
        <div className="profile__card">
            <img className="image__profile" src={noUserImg} alt="Nothing"/>
            <h3>{username}</h3>
            <h4>{email}</h4>
        </div>
    );
};

export default ProfilePageCard;