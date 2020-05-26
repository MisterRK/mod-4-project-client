import React from 'react'
import { Route } from "react-router-dom"
import HowToPlay from './components/HowToPlay'
import GameContainer from './container/GameContainer'
import Home from './components/Home'
import PlayersContainer from './containers/PlayersContainer'
import ScoresContainer from './containers/ScoresContainer'
import './App.css';
import Scene from "./components/Scene.js"
import GameContainer from "./components/GameContainer.js"


class App extends React.Component {

  render(){
    return (
      <div className="App">
      <Route exact path='/' component={Home}/>
      <Route exact path='/game' component={GameContainer}/>
      <Route exact path='/how_to_play' component={HowToPlay}/>
      <Route exact path='/high_scores' component={ScoresContainer}/>
      <Route exact path="/players" component={PlayersContainer} />
      </div>
    );
  }

}

export default App;
