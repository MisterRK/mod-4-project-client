import React from 'react'
import { Link } from 'react-router-dom'
import ScoreListing from '../components/ScoreListing'

const ScoresContainer = (props) => {
    console.log("ScoresContainer props", props)
    return(
      <>
      <h1>You are on the high scores page</h1>
      <Link to='/'><button>Home</button></Link>
      <ScoreListing/>
      </>
    )
}
export default ScoresContainer