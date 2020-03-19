import React from 'react';

class Rank extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			rankEmogi: ''
		}
	}
	
	getEmoji = (rank) => {
		if(rank){
			    
			fetch(`https://v0unq9sxka.execute-api.us-east-1.amazonaws.com/prod/rank?rank=${rank}`)
			.then(res => res.json())
			.then(data => (this.setState({rankEmogi: data.input})))
			.catch(err => console.log(err))
		}
	}


	componentDidMount(){
		this.getEmoji(this.props.rank);
	}

	render(){
		const {name, rank} = this.props;
		const {rankEmogi} = this.state;

		return (
			<div>
				<div className="f3 white">
					{`${name}, your current rank is...`}
				</div>
				<div className="f1 white">
					{`#${rank}`}
				</div>
				<div className="f1 white">
					{`${rankEmogi}`}
				</div>
			</div>
		);
	}
}

export default Rank;