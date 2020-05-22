import React from 'react'
import { Link } from 'react-router-dom'

const Game = () => {
  return(
    <>
    <h1>You are on the game page</h1>
    <Link to='/'><button>Home</button></Link>
    </>
  )
}

export default Game