import React from 'react';
import './FaceRecognition.css';

const faceRecognition = ({imageURL, boxModel}) => {
	const style = {
		top: boxModel.topRow,
		bottom: boxModel.bottomRow,
		left: boxModel.leftColumn,
		right: boxModel.rightColumn
	}
	return(
		<div className="center ma">
			<div className="absolute mt2">
				<img id="inputImage" src={imageURL} width="500px" heigh="auto" alt=""/>
				<div className="bounding-box" style={style}></div>
			</div>
		</div>
	);
}

export default faceRecognition;