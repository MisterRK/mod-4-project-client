import React from 'react';
import logo from './logo.svg';
import './App.css';
import Scene from "./components/Scene.js"
import GameContainer from "./components/GameContainer.js"

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <GameContainer></GameContainer>
      </header>
    </div>
  );
}

export default App;
