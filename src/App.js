import React, { Component } from 'react';
import Inicio from "./components/Inicio"
import './App.css';
import NavBar from './components/NavBar';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar className="fondoNav"/>
        <Inicio />
      </div>
    );
  }
}
export default App;
