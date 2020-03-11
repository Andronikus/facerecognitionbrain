import React from 'react';
import ProfileIcon from '../ProfileIcon/ProfileIcon';

const navigation = ({ onRouteChange, isSignIn }) => {

	let navItems;

	if (isSignIn) {
		//navItems = <p onClick={() => onRouteChange('signOut')} className="f3 link dim black underline pa3 pointer"> Sign out</p>;
		navItems = <ProfileIcon />;
	} else {
		navItems = (<>
			<p onClick={() => onRouteChange('signIn')} className="f3 link dim black underline pa3 pointer"> Sign In</p>
			<p onClick={() => onRouteChange('register')} className="f3 link dim black underline pa3 pointer"> Register</p>
		</>
		);
	}
	return (
		<nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
			{navItems}
		</nav>
	);
}

export default navigation;