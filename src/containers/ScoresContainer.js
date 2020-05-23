import React from 'react'
import { Link } from 'react-router-dom'
import ScoreListing from '../components/ScoreListing'

class ScoresContainer extends React.Component{

  state = {
    scores:[]
  }

  componentDidMount(){
    fetch(`http://localhost:3001/api/v1/scores`)
      .then(response => response.json())
      .then(json => this.setState({scores: json}))
  }
  render(){
    console.log("ScoresContainer state", this.state)
    return(
      <>
      <h1>You are on the high scores page</h1>
      <Link to='/'><button>Home</button></Link>
      <ScoreListing/>
      </>
    )
  }
}
export default ScoresContainer