import React from "react"
import Scene from "../../components/Scene.js"
import Home from 'containers/Home';


export default class GameContainer extends React.Component {
    state = {
        angle: 0,
        mouth: 0,
        faceIsPresent: false
    }
    setFace = (value) => {
        this.setState({ faceIsPresent: value })
      }
      setAngle = (value) => {
    
        this.setState({ angle: value })
      }
      setMouth=(value)=>{
        this.setState({ mouth: value })
      }

    render() {
        return (
            <div>
                <Home setMouth={this.setMouth} setRotation={this.setAngle} setFace={this.setFace} />

                <Scene mouth={this.state.mouth} face={this.state.faceIsPresent} angle={this.state.angle} onKeyDown={() => this.paddlePosition()}></Scene>

            </div>
        )
    }
}