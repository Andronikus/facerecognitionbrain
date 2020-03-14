import React from 'react';

import './Profile.css';

const Profile = ({ toogleModal, userInfo }) => {

    return (
        <div className="profile-modal">
            <div className="profile-container">
                <img src="http://tachyons.io/img/logo.jpg" className="profile-avatar" alt="avatar" />
                <h1>{userInfo.name}</h1>
                <h4>{`Images submitted: ${userInfo.rank}`}</h4>
                <p>{`Member since: ${new Date(userInfo.joinedAt).toLocaleDateString()}`}</p>
                <hr></hr>
                <div className="profile-form-container">
                    <label htmlFor="name" >Name:</label>
                    <input type="text" name="name" id="name" placeholder={userInfo.name}></input>
                    <label htmlFor="name" >Age:</label>
                    <input type="text" name="age" id="age" placeholder={userInfo.age}></input>
                    <label htmlFor="pet" >Pet:</label>
                    <input type="text" name="pet" id="pet" placeholder={userInfo.pet}></input>
                    <div className="profile-form-buttons">
                        <button className="form-button button-save">Save</button>
                        <button className="form-button button-cancel" onClick={toogleModal}>Cancel</button>
                    </div>
                </div>
                <div className="button-close">
                    <span onClick={toogleModal}>&times;</span>
                </div>
            </div>
        </div>
    );
}

export default Profile;