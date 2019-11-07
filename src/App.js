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
      userLoaded: {
        id: '',
        name: '',
        rank: 0
      }
    }

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

  calculateFaceLocation(data){
    const clarifaiFaceRegion = data.regions[0].region_info.bounding_box;
    const inputImage = document.getElementById('inputImage');
    const width  = Number(inputImage.width);
    const height = Number(inputImage.height);
    
    const boundingValues = {
        leftColumn  : width * Number(clarifaiFaceRegion.left_col),
        rightColumn : width - (width * Number(clarifaiFaceRegion.right_col)),
        topRow      : height * Number(clarifaiFaceRegion.top_row),
        bottomRow   : height - (height * Number(clarifaiFaceRegion.bottom_row))
      }
    return boundingValues;
  }

  setFaceBox(faceBox){
    this.setState({faceBox: faceBox});
  }

  onInputChange = (event) =>{
    this.setState({input: event.target.value});
  }

  onImageSubmit = () => {
    this.setState({imageURL: this.state.input});
    
    const postReq = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({input: this.state.input})
          }

    fetch(`${Env.SERVER_URL}/imageURL`, postReq)
      .then(response => response.json())
      .then(imageData => {
        if(imageData){
          this.setFaceBox(this.calculateFaceLocation(imageData))
          const data = {
            id: this.state.userLoaded.id
          }
          const putReq = {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }
          fetch(`${Env.SERVER_URL}/image`, putReq)
            .then(response => response.json())
            .then(data => {
              console.log('data.rank', data);
              this.setState({userLoaded: Object.assign(this.state.userLoaded, {rank: data.rank})})
            })
            .catch(console.log);
        }
      })
      .catch( err => console.log(err));
  }

  onRouteChange = (route) => {
    switch (route){
      case 'home':
        this.setState({isSignIn: true})
        this.setState({route: 'home'});
        break;
      case 'signOut':
        this.setState(initialState);
        this.setState({route: 'signIn'});
        break;
      default:
        this.setState({route: route});
    }
  }

  loadUserInfo = (data) => {
      this.setState({userLoaded: {...this.state.userLoaded, id: data.id, name: data.name, rank: data.entries}})
  }

  render(){
    let componentsToRender;

    switch(this.state.route){
      case 'signIn':
        componentsToRender = <SignIn onRouteChange={this.onRouteChange} loadUserInfo={this.loadUserInfo}/>;
        break;
      case 'register':
        componentsToRender = <Register onRouteChange={this.onRouteChange} loadUserInfo={this.loadUserInfo}/>;
        break;
      default:
        componentsToRender = (<Fragment> 
                                <Logo />
                                <Rank name={this.state.userLoaded.name} rank={this.state.userLoaded.rank}/>
                                <ImageLinkForm inputChange={this.onInputChange} buttonClick={this.onImageSubmit}/>
                                <FaceRecognition imageURL={this.state.imageURL} boxModel={this.state.faceBox}/>
                              </Fragment>)
    }

    return (
      <div className="App">
        <Particles params={particleOptions} className="particles"/>
        <Navigation onRouteChange={this.onRouteChange} isSignIn={this.state.isSignIn} />
        {componentsToRender}
      </div>
    );
  }
}

export default App;
// https://www.goldennumber.net/wp-content/uploads/2013/08/florence-colgate-england-most-beautiful-face.jpg
