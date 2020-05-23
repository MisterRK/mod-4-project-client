import React from 'react'
import { Route } from "react-router-dom"
import HowToPlay from './components/HowToPlay'
import Game from './components/Game'
import Home from './components/Home'
import PlayersContainer from './containers/PlayersContainer'
import ScoresContainer from './containers/ScoresContainer'
import './App.css';

class App extends React.Component {

  render(){
    console.log("App level State", this.state)
    return (
      <div className="App">
      <Route exact path='/' component={Home}/>
      <Route exact path='/game' component={Game}/>
      <Route exact path='/how_to_play' component={HowToPlay}/>
      <Route exact path='/high_scores' component={ScoresContainer}/>
      <Route exact path="/players" component={PlayersContainer} />
      </div>
    );
  }
}

export default App;
