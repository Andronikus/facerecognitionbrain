import React from 'react';
import Tilt from 'react-tilt'
import './Logo.css';
import brainLogo from './brain-logo.png';

const logo = () => {
	return (
		<div className="ma4 mt0">
			<Tilt className="Tilt br2 shadow-2" options={{ max : 25 }} style={{ height: 150, width: 150 }} >
 				<div className="Tilt-inner pa3"> 
 					<img src={brainLogo} alt="app logo"/>
 				</div>
			</Tilt>
		</div>
	);
}

export default logo;