import React from 'react';
import './ImageLinkForm.css';

const imageLinkForm = ({inputChange, buttonClick}) => {
	return (
		<div>
			<p className="f3">{'This Magic Brain will detect faces in your picture. Give it a try!'}</p>
			<div className="center">
				<div className="pa4 br3 shadow-5 form center">
					<input type='text' className="f4 pa2 w-70 center" onChange={inputChange}/>
					<button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple" 
							onClick={buttonClick}>Detect</button>
				</div>
			</div>
		</div>
	);
}

export default imageLinkForm;