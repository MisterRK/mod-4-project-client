import React from "react"
import ReactDOM from "react-dom";
import Matter from "matter-js";

let Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body= Matter.Body

class Scene extends React.Component{
    state={
    rectangles:[],
    render:"",
    paddle:"",
    ball:""
    }
   
   

    //start of mounting
    componentDidMount(){
       
    //create engine and renderer
    let engine = Engine.create({
      // positionIterations: 20

    })
    let render = Render.create({
        element: this.refs.scene,
        engine: engine,
        options: {
          width: 600,
          height: 600,
          wireframes: false
        }
      })
        //add Stuff!!
      let boundaryLeft = Bodies.rectangle(10, 332, 25, 800, { isStatic: true })
      let boundaryRight = Bodies.rectangle(800, 332, 25, 800, { isStatic: true })
      let circle= Bodies.circle(300, 400, 25, { friction: 0, density: 0.1, frictionAir: .01 })
      let paddle = Bodies.rectangle(400, 500, 800, 25, { isStatic: true, friction: 0 })
      let testPlatform= Bodies.rectangle(400, 100, 100, 40, { isStatic: true });
      this.state.rectangles.push(testPlatform)
      //add  stuffto world
      World.add(engine.world, [circle, boundaryRight, boundaryLeft, paddle, testPlatform])

     

      //run engine and renderer
      Engine.run(engine)
      Render.run(render)
      //update state
      this.setState({render:render, paddle: paddle, ball: circle})
      
      //add, update, and delete rectangles over time
    //   setInterval(()=>this.addRectangle(engine),1000)
      setInterval(()=>this.updateRectangles(circle), .3)
      setInterval(this.deleteRectangles, .3)
    }
    //end of onMount

    paddlePosition=(e) =>{
        console.log("EE")
        if(e.keyCode===68){
            Body.rotate(this.state.paddle,.01)
        }  else if(e.keyCode= 65){
            Body.rotate(this.state.paddle,-.01)

        }
    }
    
    //add obstacle
    addRectangle = (engine)=>{
        console.log("OK")
        let platform = Bodies.rectangle(this.getRandomInt(80,740), -200, 100, 40, { isStatic: true });
        this.state.rectangles.push(platform)
        World.add(engine.world, platform)
    }
    //update rectangles
    updateRectangles=(circle) =>{

        for(const rect of this.state.rectangles){
    
           Body.setPosition(rect, {x:rect.position.x, y: (rect.position.y)+.3})
           this.isTouchingBottom(rect, circle,50)
        }
    }
    deleteRectangles=()=>{
        for (let i = 0; i < this.state.rectangles.length; i++) {
            if (this.state.rectangles[i].position.y > 620) {
                this.state.rectangles.splice(i,1)
            }
        }
    }
    //get random integer
    getRandomInt= (min, max) =>{
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
      }


      //lerpp
    lerp = (start, end, amount) => {
        return (1 - amount) * start + amount * end
    }


    //collision detection with bottom of platform
    //platform dimensions are
    isTouchingBottom = (circle, rectangle, radius)=>{
        let cx = circle.position.x
        let cy= circle.position.y
       
        let rx= rectangle.position.x
        let ry= rectangle.position.y
        let rHeight= this.calcRectangleHeight(rectangle)
        let rWidth= this.calcRectangleWidth(rectangle)
        let testX= circle.position.x
        //set 1st closest edge to always be bottom
        let testY= ry+ rHeight
        //set 2nd closest edge to be left or right context dependent if not below
        if(cx< rx){
            testX= rx
        }else if(cx > rx + rWidth){
            testX= rx +rWidth
        }   
        let distance= this.calcDistance(cx, cy, testX, testY)
        //gets to 28
        
        if(distance <= radius){
            console.log("YE")
            return true
        }
        return false
    }
    calcDistance=(x1,y1, x2, y2)=>{
        let distX= x1-x2
        let distY= y1-y2
        return Math.sqrt((distX*distX) +(distY*distY))
    }
    calcRectangleHeight =(rectangle)=>{
       return rectangle.vertices[2].y - rectangle.vertices[1].y
    }
    calcRectangleWidth=(rectangle)=>{
        return rectangle.vertices[4].x - rectangle.vertices[1].x
    }

    render(){
        return <div ref="scene"/>
    }
}
export default Scene
    
      