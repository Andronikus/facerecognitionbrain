import React from 'react';
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';

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

    dropDownMenu = {
        transform: 'translateX(-40px)',
        minWidth: '8rem',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
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
                            class="br-100 h3 w3 dib" alt="avatar" />
                    </DropdownToggle>
                    <DropdownMenu className="b--transparent shadow-5" style={this.dropDownMenu}>
                        <div className="dropMenuItem" onClick={this.toggle}>Profile</div>
                        <DropdownItem divider />
                        <div className="dropMenuItem" onClick={this.toggle}>Logout</div>
                    </DropdownMenu>
                </Dropdown>
            </div>
        );
    }
}

export default ProfileIcon;