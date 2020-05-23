import React from 'react'
import { Link } from 'react-router-dom'



class Menu extends React.Component {
  state = {
    players:[],
    scores:[]
  }

  componentDidMount(){
    fetch(`http://localhost:3001/api/v1/scores`)
      .then(response => response.json())
      .then(scores => this.setState({scores}))

    fetch('http://localhost:3001/api/v1/users')
      .then(response => response.json())
      .then(players => this.setState({players}))
  }
  render () {
    // console.log("Menu State", this.state)
    return (
      <>
      <h1>Menu Component!</h1>
      <Link to="/game"><button>Start</button></Link>
      <br/>
      <Link to="/how_to_play"><button>How To Play</button></Link>
      <br/>
      <Link to="/high_scores"><button>High Scores</button></Link>
      <br/>
      <Link to="/players"><button>Players</button></Link>
      </>
    )
  }
}

export default Menu