import React from 'react';

const faceRecognition = ({imageURL}) => {
	return(
		<div className="center ma">
			<div className="absolute mt2">
				<img src={imageURL} width="500px" heigh="auto" alt="Recognize face"/>
			</div>
		</div>
	);
}

export default faceRecognition;