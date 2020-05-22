import React from 'react'
import { Route } from "react-router-dom"
import Menu from './components/Menu'
import Logo from './components/Logo'
import HowToPlay from './components/HowToPlay'
import Game from './components/Game'
import ScoresContainer from './containers/ScoresContainer'

import Home from './components/Home'


import './App.css';




class App extends React.Component {
  render(){
    return (
      <div className="App">
      <Route exact path='/' component={Home}/>
      <Route exact path='/game' component={Game}/>
      <Route exact path='/how_to_play' component={HowToPlay}/>
      <Route exact path='/high_scores' component={ScoresContainer}/>
      </div>
    );
  }
}

export default App;
