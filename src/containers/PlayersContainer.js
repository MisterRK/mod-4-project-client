import React from 'react'
import { Link } from 'react-router-dom'

class PlayersContainer extends React.Component{

  componentDidMount(){
    fetch(`http://localhost:3001/api/v1/users`)
      .then(response => response.json())
      .then(json => console.log(json))
  }
  render() {
    console.log("PlayersContainer State;", this.state)
    return(
      <div>
        <h1> This it the Players Container </h1>
        <Link to='/'><button>Home</button></Link>
      </div>
    )
  }
}
export default PlayersContainer