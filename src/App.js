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

<<<<<<< HEAD
<<<<<<< HEAD
function App() {
  return (
    <div className="App">
      <header className="App-header">
       <GameContainer></GameContainer>
      </header>
    </div>
  );
=======
=======

>>>>>>> 7f50b1f14b1e2668a97260a12ccbab7630473bf9
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
<<<<<<< HEAD
>>>>>>> 50eb88872b7d9a4819a02977f3304603e3bdc85e
=======

>>>>>>> 7f50b1f14b1e2668a97260a12ccbab7630473bf9
}

export default App;
