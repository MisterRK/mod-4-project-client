/*
 *
 * App
 *
 */

import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import NotFound from 'containers/NotFound';
import GameContainer from 'containers/GameContainer'

import './style.css';
import './styleM.css';

export default class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' render={() =>
          <div>
            <GameContainer ></GameContainer>
          </div>
        } />

        <Route path='*' render={() => <NotFound />} />
      </Switch>
    );
  }
}
