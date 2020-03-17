import React from 'react';

import Env from '../../environment';

import './Profile.css';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.userInfo.name,
            age: this.props.userInfo.age,
            pet: this.props.userInfo.pet,
        }
    }

    onInputChange = event => {
        switch (event.target.name) {
            case 'name':
                this.setState({ name: event.target.value });
                break;
            case 'age':
                this.setState({ age: event.target.value });
                break;
            case 'pet':
                this.setState({ pet: event.target.value });
                break;
            default:
                return;
        }
    }

    onSaveHandler = data => {
        fetch(`${Env.SERVER_URL}/profile/${this.props.userInfo.id}`, {
            method: 'post',
            headers: {
                'Content-type': 'application/json',
                'Authorization': window.sessionStorage.getItem('token'),
            },
            body: JSON.stringify({ formProfile: data })
        })
        .then(res => {
            const {status} = res;
            
            if(status === 200 || status === 304){
                this.props.toogleModal();
                this.props.loadUserInfo({ ...this.props.userInfo, ...data });
            }
        })
        .catch(err => console.log(err));
    }

    render() {
        const { userInfo } = this.props;
        const { name, age, pet } = this.state;
        return (
            <div className="profile-modal">
                <div className="profile-container">
                    <img src="http://tachyons.io/img/logo.jpg" className="profile-avatar" alt="avatar" />
                    <h1>{this.state.name}</h1>
                    <h4>{`Images submitted: ${userInfo.rank}`}</h4>
                    <p>{`Member since: ${new Date(userInfo.joined_at).toLocaleDateString()}`}</p>
                    <hr></hr>
                    <div className="profile-form-container">
                        <label htmlFor="name" >Name:</label>
                        <input type="text" name="name" id="name" placeholder={userInfo.name} onChange={this.onInputChange}></input>
                        <label htmlFor="name" >Age:</label>
                        <input type="text" name="age" id="age" placeholder={userInfo.age} onChange={this.onInputChange}></input>
                        <label htmlFor="pet" >Pet:</label>
                        <input type="text" name="pet" id="pet" placeholder={userInfo.pet} onChange={this.onInputChange}></input>
                        <div className="profile-form-buttons">
                            <button className="form-button button-save" onClick={() => this.onSaveHandler({ name, age, pet })}>Save</button>
                            <button className="form-button button-cancel" onClick={this.props.toogleModal}>Cancel</button>
                        </div>
                    </div>
                    <div className="button-close">
                        <span onClick={this.props.toogleModal}>&times;</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;