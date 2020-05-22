import React from 'react'
import { Link } from 'react-router-dom'


const Menu = () => {
  return (
    <>
    <h1>Menu Component!</h1>
    <Link to="/game"><button>Start</button></Link>
    <br/>
    <Link to="/how_to_play"><button>How To Play</button></Link>
    <br/>
    <Link to="/high_scores"><button>High Scores</button></Link>
    </>
  )
}

export default Menu