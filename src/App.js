import React from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import './App.css';
import GameContainer from './Containers/GameContainer';
import HighScoreContainer from './Containers/HighScoreContainer';
import HowToPlayContainer from './Containers/HowToPlayContainer';
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'




function App() {
  return (
    <Router>
        <Box>
        <Container maxWidth="sm">
        <nav>
          <ul className='menu'>
            <li>
              <Link to="/game">Start</Link>
              <Route path="/game" component={GameContainer} />
            </li>
            <li>
              <Link to="/high_scores">High Scores</Link>
              <Route path="/high_scores" component={HighScoreContainer} />
            </li>
            <li>
              <Link to="/how_to_play">How To Play</Link>
              <Route path="/how_to_play" component={HowToPlayContainer} />
            </li>
          </ul>
        </nav>
        </Container>
        </Box>
    </Router>
  );
}

export default App;
