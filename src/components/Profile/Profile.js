import React from 'react';

import './Profile.css';

const Profile = ({ toogleModal }) => {

    return (
        <div className="profile-modal">
            <button onClick={toogleModal} >Click Me</button>
        </div>
    );
}

export default Profile;