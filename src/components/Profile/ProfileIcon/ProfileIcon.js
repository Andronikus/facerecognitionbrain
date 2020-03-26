import React from 'react';
import { connect } from 'react-redux';
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';

import { userSignOut } from '../../../redux/reducers/user/user.action';
import { toggleModal } from '../../../redux/reducers/modal/modal.action';

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
        this.props.toggleModal();
    }

    onLogoutHandler = () => {
        this.props.signOut();
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

const mapDispatchToProps = dispatch => ({
    signOut: () => dispatch(userSignOut()),
    toggleModal: () => dispatch(toggleModal()),
})

export default connect(null, mapDispatchToProps)(ProfileIcon);