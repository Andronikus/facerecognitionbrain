import React, { Component } from 'react';
import Env from '../../environment';

class Register extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			name: '',
			email: '',
			password: ''
		}
	}

	onNameChange = (event) => {
		this.setState({name: event.target.value});
	}

	onEmailChange = (event) => {
		this.setState({email: event.target.value});
	}

	onPasswordChange = (event) => {
		this.setState({password: event.target.value});
	}

	onUserRegister = () => {
		const {onRouteChange, loadUserInfo} = this.props;

		const data = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password
		}

		const postReq = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data)
		}

		fetch(`${Env.SERVER_URL}/register`, postReq)
			.then(response => response.json())
			.then(user => {
				console.log(user);
				if(user.id){
					loadUserInfo({...user, rank: user.entries});
					onRouteChange('home');
				}
			})
			.catch(err => console.log(err));
	}

	render(){
		return (
			<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l shadow-5 mw5 center">
	  			<main className="pa4 black-80">
				  <div className="measure">
				    {
					    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					      <legend className="f2 fw6 ph0 mh0">Register</legend>
					      <div className="mt3">
					        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
					        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        	   type="text" 
					        	   name="name" 
					        	   id="name" 
					        	   onChange={ this.onNameChange }
					        />
					      </div>
					      <div className="mt3">
					        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
					        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        	   type="email" 
					        	   name="email-address"  
					        	   id="email-address"
					        	   onChange={this.onEmailChange}
					        />
					      </div>
					      <div className="mv3">
					        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
					        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        	   type="password" 
					        	   name="password" 
					        	   id="password"
					        	   onChange={this.onPasswordChange}
					        />
					      </div>
					    </fieldset>
					}
				    <div className="">
				      <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
				      		 type="submit" 
				      		 value="Register" 
				      		 onClick={this.onUserRegister}/>
				    </div>
				  </div>
				</main>
			</article>
		);
	}
}

export default Register;