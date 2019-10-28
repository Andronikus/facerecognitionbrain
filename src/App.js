import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css';

// own components
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

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

const app = new Clarifai.App({
 apiKey: '0188dad1d63f4aa3be99ff4db5167386'
});

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageURL: ''
    }
  }

  onInputChange = (event) =>{
    this.setState({input: event.target.value});
  }

  onButtonClick = () => {
    this.setState({imageURL: this.state.input});
    // clarifai api
    app.models.predict(Clarifai.FACE_DETECT_MODEL,this.state.input)
      .then(response => {
          console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      })
      .catch( err => console.log(err));
  }

  render(){
    return (
      <div className="App">
        <Particles params={particleOptions} className="particles"/>
        <Navigation/>
        <Logo />
        <Rank />
        <ImageLinkForm inputChange={this.onInputChange} buttonClick={this.onButtonClick}/>
        <FaceRecognition imageURL={this.state.imageURL}/>
      </div>
    );
  }
}

export default App;
