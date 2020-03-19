import React from 'react';
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';

import ENV from '../../../environment';

import './ProfileIcon.css';

class ProfileIcon extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false
        }
    }

    toggle = () => {
        this.setState(prevState => (
            {
                dropdownOpen: !prevState.dropdownOpen
            }
        ));
    }

    viewProfileHandler = () => {
        this.toggle();
        this.props.toogleModal();
    }

    onLogoutHandler = () => {
        const sessionToken = window.sessionStorage.getItem('token');

        if(sessionToken){
            fetch(`${ENV.SERVER_URL}/logout`, {
                method: 'post',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({sessionToken})
            })
            .then(res => {
                return res.status === 200 ? window.sessionStorage.removeItem('token') : null;
            })
            .catch( err => console.log(err));
        }

        this.props.routeChange('signIn');
        this.toggle();
    }


    dropDownMenu = {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        transform: 'translateX(-96px)',
    }

    render() {
        const { dropdownOpen } = this.state;
        return (
            <div className="pa4 tc">
                <Dropdown isOpen={dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle
                        tag="span"
                        data-toggle="dropdown"
                        aria-expanded={dropdownOpen}
                    >
                        <img
                            src="http://tachyons.io/img/logo.jpg"
                            className="br-100 h3 w3 dib" alt="avatar" />
                    </DropdownToggle>
                    <DropdownMenu right className="b--transparent shadow-5 menu" style={this.dropDownMenu}>
                        <div className="dropMenuItem" onClick={this.viewProfileHandler}>View Profile</div>
                        <DropdownItem divider />
                        <div className="dropMenuItem" onClick={this.onLogoutHandler}>Logout</div>
                    </DropdownMenu>
                </Dropdown>
            </div>
        );
    }
}

export default ProfileIcon;