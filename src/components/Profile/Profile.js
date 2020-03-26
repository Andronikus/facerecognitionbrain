import React from 'react';
import { connect } from 'react-redux';

import { updateUserInfo } from '../../redux/reducers/user/user.action';
import { toggleModal } from '../../redux/reducers/modal/modal.action';

import './Profile.css';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            age: this.props.age,
            pet: this.props.pet,
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
        const { id } = this.props;
        const userInfo = {...data, id};

        this.props.updateUserInfo(userInfo);
        /*
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
        */
    }

    render() {
        const { name, age, pet } = this.state;
        return (
            <div className="profile-modal">
                <div className="profile-container">
                    <img src="http://tachyons.io/img/logo.jpg" className="profile-avatar" alt="avatar" />
                    <h1>{this.state.name}</h1>
                    <h4>{`Images submitted: ${this.props.rank}`}</h4>
                    <p>{`Member since: ${new Date(this.props.joinedAt).toLocaleDateString()}`}</p>
                    <hr></hr>
                    <div className="profile-form-container">
                        <label htmlFor="name" >Name:</label>
                        <input type="text" name="name" id="name" placeholder={this.props.name} onChange={this.onInputChange}></input>
                        <label htmlFor="name" >Age:</label>
                        <input type="text" name="age" id="age" placeholder={this.props.age} onChange={this.onInputChange}></input>
                        <label htmlFor="pet" >Pet:</label>
                        <input type="text" name="pet" id="pet" placeholder={this.props.pet} onChange={this.onInputChange}></input>
                        <div className="profile-form-buttons">
                            <button className="form-button button-save" onClick={() => this.onSaveHandler({ name, age, pet })}>Save</button>
                            <button className="form-button button-cancel" onClick={this.props.toggleModal}>Cancel</button>
                        </div>
                    </div>
                    <div className="button-close">
                        <span onClick={this.props.toggleModal}>&times;</span>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ...state.user,
    id: state.user.id,
});

const mapDispatchToProps = dispatch => ({
    updateUserInfo: userInfo => dispatch(updateUserInfo(userInfo)),
    toggleModal: () => dispatch(toggleModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);