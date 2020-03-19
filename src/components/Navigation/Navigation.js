import React from 'react';
import ProfileIcon from '../Profile/ProfileIcon/ProfileIcon';

const navigation = ({ onRouteChange, isSignIn, toogleModal, userInfo }) => {

	let navItems;

	if (isSignIn) {
		navItems = <ProfileIcon toogleModal={toogleModal} routeChange={onRouteChange}/>;
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