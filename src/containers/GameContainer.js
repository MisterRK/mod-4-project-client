import React from "react"
import Scene from "../components/Scene.js"

export default class GameContainer extends React.Component {



render(){
    return(
        <Scene onKeyDown={()=>this.paddlePosition()}></Scene>
    )
}
}