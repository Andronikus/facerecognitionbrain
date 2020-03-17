import React, { Component, Fragment } from 'react';
import Particles from 'react-particles-js';

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


import Env from './environment';

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
  imageURL: '',
  faceBox: {},
  route: 'signIn',
  isSignIn: false,
  isModelOpen: false,
  userLoaded: {
    id: '',
    name: '',
    rank: 0,
    joined_at: '',
    age: '',
    pet: '',
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  calculateFaceLocation(data) {
    const clarifaiFaceRegion = data.regions[0].region_info.bounding_box;
    const inputImage = document.getElementById('inputImage');
    const width = Number(inputImage.width);
    const height = Number(inputImage.height);

    const boundingValues = {
      leftColumn: width * Number(clarifaiFaceRegion.left_col),
      rightColumn: width - (width * Number(clarifaiFaceRegion.right_col)),
      topRow: height * Number(clarifaiFaceRegion.top_row),
      bottomRow: height - (height * Number(clarifaiFaceRegion.bottom_row))
    }
    return boundingValues;
  }

  setFaceBox(faceBox) {
    this.setState({ faceBox: faceBox });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onImageSubmit = () => {
    this.setState({ imageURL: this.state.input });

    const postReq = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': window.sessionStorage.getItem('token')
      },
      body: JSON.stringify({ input: this.state.input })
    }

    fetch(`${Env.SERVER_URL}/imageURL`, postReq)
      .then(response => response.json())
      .then(imageData => {
        if (imageData) {
          this.setFaceBox(this.calculateFaceLocation(imageData))
          const data = {
            id: this.state.userLoaded.id
          }
          const putReq = {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': window.sessionStorage.getItem('token')
            },
            body: JSON.stringify(data)
          }
          fetch(`${Env.SERVER_URL}/image`, putReq)
            .then(response => response.json())
            .then(data => {
              this.setState({ userLoaded: Object.assign(this.state.userLoaded, { rank: data.rank }) })
            })
            .catch(console.log);
        }
      })
      .catch(err => console.log(err));
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

  loadUserInfo = (data) => {
    this.setState({ userLoaded: { ...this.state.userLoaded, id: data.id, name: data.name, rank: data.rank, joined_at: data.joined_at, age: data.age, pet: data.pet } })
  }

  toogleModal = () => {
    this.setState(prevState => ({ isModelOpen: !prevState.isModelOpen }))
  }

  componentDidMount(){
    const authToken = window.sessionStorage.getItem('token');

    if(authToken){
      fetch(`${Env.SERVER_URL}/signin`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authToken  
        }
      })
      .then(res => res.json())
      .then(data => {
        if(data && data.userId){
          // get profile info
          fetch(`${Env.SERVER_URL}/profile/${data.userId}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': authToken
            }
          })
          .then(res => res.json())
          .then(data => {
            this.loadUserInfo({...data, rank: data.entries});
            this.onRouteChange('home');
          })
          .catch(console.log);
        }
      })
    }
  }

  render() {
    let componentsToRender;

    const { isModelOpen } = this.state;


    switch (this.state.route) {
      case 'signIn':
        componentsToRender = <SignIn onRouteChange={this.onRouteChange} loadUserInfo={this.loadUserInfo} />;
        break;
      case 'register':
        componentsToRender = <Register onRouteChange={this.onRouteChange} loadUserInfo={this.loadUserInfo} />;
        break;
      default:
        componentsToRender = (<Fragment>
          <Logo />
          <Rank name={this.state.userLoaded.name} rank={this.state.userLoaded.rank} />
          <ImageLinkForm inputChange={this.onInputChange} buttonClick={this.onImageSubmit} />
          <FaceRecognition imageURL={this.state.imageURL} boxModel={this.state.faceBox} />
        </Fragment>)
    }

    return (
      <div className="App">
        <Particles params={particleOptions} className="particles" />
        <Navigation onRouteChange={this.onRouteChange} isSignIn={this.state.isSignIn} toogleModal={this.toogleModal} />
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

export default App;
// https://www.goldennumber.net/wp-content/uploads/2013/08/florence-colgate-england-most-beautiful-face.jpg
