import React, { Component } from 'react';
import Particles from 'react-particles-js';
import './App.css';

// own components
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';

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

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: ''
    }
  }

  onInputChange = (event) =>{
    console.log(event.target.value);
  }

  onButtonClick = () => {
    console.log('btn clicked');
  }

  render(){
    return (
      <div className="App">
        <Particles params={particleOptions} className="particles"/>
        <Navigation/>
        <Logo />
        <Rank />
        <ImageLinkForm inputChange={this.onInputChange} buttonClick={this.onButtonClick}/>
      </div>
    );
  }
}

export default App;
