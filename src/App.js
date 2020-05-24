import React from 'react';
import logo from './logo.svg';
import './App.css';
import Scene from "./components/Scene.js"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Scene onKeyDown={()=>this.paddlePosition()}></Scene>
      </header>
    </div>
  );
}

export default App;
