import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Particles from 'react-particles-js';
import { userAlreadySigned } from './redux/reducers/user/user.action';
import { submitImage } from './redux/reducers/image/image.action';

import './App.css';

// own components
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './containers/SignIn/SignIn';
import Register from './containers/Register/Register';
import Modal from './components/Modal/Modal';
import Profile from './components/Profile/Profile';


const particleOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
  input: '',
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onImageSubmit = () => {
    const { id, submitImage} = this.props;
    submitImage({imageURL: this.state.input, userID: id});
  }

  onRouteChange = (route) => {
    switch (route) {
      case 'home':
        this.setState({ isSignIn: true })
        this.setState({ route: 'home' });
        break;
      case 'signOut':
        this.setState(initialState);
        this.setState({ route: 'signIn' });
        break;
      default:
        this.setState({ isSignIn: false, route: route });
    }
  }

  toogleModal = () => {
    this.setState(prevState => ({ isModelOpen: !prevState.isModelOpen }))
  }

  componentDidMount(){
    this.props.userAlreadySigned();
  }

  render() {
    let componentsToRender;
    const { currentRoute, name, rank, isSignedIn,imageURL,faceBox, isModelOpen } = this.props;

    switch (currentRoute) {
      case 'signIn':
        componentsToRender = <SignIn onRouteChange={this.onRouteChange} loadUserInfo={this.loadUserInfo} />;
        break;
      case 'register':
        componentsToRender = <Register onRouteChange={this.onRouteChange} loadUserInfo={this.loadUserInfo} />;
        break;
      default:
        componentsToRender = (<Fragment>
          <Logo />
          <Rank name={name} rank={rank} />
          <ImageLinkForm inputChange={this.onInputChange} buttonClick={this.onImageSubmit} />
          <FaceRecognition imageURL={imageURL} boxModel={faceBox} />
        </Fragment>)
    }

    return (
      <div className="App">
        <Particles params={particleOptions} className="particles" />
        <Navigation onRouteChange={this.onRouteChange} isSignIn={isSignedIn} toogleModal={this.toogleModal}/>
        {
          isModelOpen &&
          <Modal>
            <Profile toogleModal={this.toogleModal} userInfo={this.state.userLoaded} loadUserInfo={this.loadUserInfo} />
          </Modal>
        }
        {componentsToRender}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentRoute: state.route.currentRoute,
  ...state.user,
  imageURL: state.image.imageURL,
  faceBox: state.image.faceBox,
  isModelOpen: state.modal.isModelOpen,
});

const mapDispatchToProps = dispatch => ({
  userAlreadySigned: () => dispatch(userAlreadySigned()),
  submitImage: (imageInfo) => dispatch(submitImage(imageInfo)),
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
// https://www.goldennumber.net/wp-content/uploads/2013/08/florence-colgate-england-most-beautiful-face.jpg
