import React from "react"
import ReactDOM from "react-dom";
import Matter from "matter-js";

let Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Detector = Matter.Detector,
    Pair = Matter.Pair

class Scene extends React.Component {
    state = {
        rectangles: [],
        render: "",
        paddle: "",
        running: ""
    }



    //start of mounting
    componentDidMount() {
        //create engine and renderer
        let engine = Engine.create({
            positionIterations: 20
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
        let circle = Bodies.circle(250, 400, 25, { friction: 0, density: 0.1, frictionAir: .01 })
        let paddle = Bodies.rectangle(10, 500, 800, 25, { isStatic: true, friction: 0 })
        let testPlatform = Bodies.rectangle(180, 100, 100, 40, { isStatic: true });
        this.state.rectangles.push(testPlatform)
        //add  stuffto world
        World.add(engine.world, [circle, boundaryRight, boundaryLeft, paddle, testPlatform])
        //run engine and renderer
        Engine.run(engine)
        Render.run(render)
        //update state
        this.setState({ render: render, paddle: paddle, ball: circle, running: true })
        //create collision pair 
        let paddleCircle = [[paddle, circle]]
        //add, update, and delete rectangles over time
        //setInterval(()=>this.addRectangle(engine),1000)
        setInterval(() => this.update(circle, paddleCircle, engine), .3)
        setInterval(this.deleteRectangles, .3)
    }
    //end of onMount

    //update function, called each .3 milliseconds
    update = (circle, paddleCircle, engine) => {
        for (const rect of this.state.rectangles) {

            Body.setPosition(rect, { x: rect.position.x, y: (rect.position.y) + .3 })
         if (this.isTouchingBottom(circle, rect, 25) && Detector.collisions(paddleCircle,engine)[0].collided) {
               console.log("is Crush")
            }
        }
    }
    paddlePosition = (e) => {
        console.log("EE")
        if (e.keyCode === 68) {
            Body.rotate(this.state.paddle, .01)
        } else if (e.keyCode = 65) {
            Body.rotate(this.state.paddle, -.01)
        }
    }

    //add obstacle
    addRectangle = (engine) => {
        console.log("OK")
        let platform = Bodies.rectangle(this.getRandomInt(80, 740), -200, 100, 40, { isStatic: true });
        this.state.rectangles.push(platform)
        World.add(engine.world, platform)
    }

    deleteRectangles = () => {
        for (let i = 0; i < this.state.rectangles.length; i++) {
            if (this.state.rectangles[i].position.y > 620) {
                this.state.rectangles.splice(i, 1)
            }
        }
    }
    //get random integer
    getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }


    //lerpp
    lerp = (start, end, amount) => {
        return (1 - amount) * start + amount * end
    }
    //lerp position between two points
    lerpPosition = (body, targetX, targetY, amount) => {
        let x = this.lerp(body.position.x, targetX, amount)
        let y = this.lerp(body.position.y, targetY, amount)
        //Body.setPosition(rect, {x:rect.position.x, y: (rect.position.y)+.3})
        Body.setPosition(body, { x: x, y: y })

    }

    //collision detection with bottom of platform
    //platform dimensions are
    isTouchingBottom = (circle, rectangle, radius) => {
        let cx = circle.position.x
        let cy = circle.position.y
        let rx = rectangle.vertices[0].x
        let ry = rectangle.vertices[0].y
        let rHeight = this.calcRectangleHeight(rectangle)
        let rWidth = this.calcRectangleWidth(rectangle)
        let testX= cx 
        //always checking against bottom edge
        let testY=ry+rHeight
        //set left or right depending on location
        testX = this.setTest(testX, cx, rx, rWidth)
        //calc distance between edges and circle
        let distance= this.calcDistance(testX, testY, cx, cy)
        if(distance <= radius){
            return true
        }
        return false
    }

    setTest= (test, c, r, w)=>{
        if(c<r){
            return r
        }else if(c > r+w){
            return r+w
        }
        return test
    }
    //calculation functions
    calcDistance = (x1, y1, x2, y2) => {
        let distX = x1 - x2
        let distY = y1 - y2
        return Math.sqrt((distX * distX) + (distY * distY))
    }
    calcRectangleHeight = (rectangle) => {
        return rectangle.vertices[2].y - rectangle.vertices[0].y
    }
    calcRectangleWidth = (rectangle) => {
        return rectangle.vertices[2].x - rectangle.vertices[0].x
    }

    render() {
        return <div ref="scene" />
    }
}
export default Scene

