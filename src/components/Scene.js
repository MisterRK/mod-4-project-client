import React from "react"
import ReactDOM from "react-dom";
import Matter from "matter-js";

let Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Detector = Matter.Detector,
    pi = 3.14159

class Scene extends React.Component {
    state = {
        rectangles: [],
        render: "",
        paddle: "",
        running: "",
        engine: "",
        ball: "", 
        paddleCircle: ""
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
        let paddle = Bodies.rectangle(200, 500, 800, 25, { isStatic: true, friction: 0 })
        let testPlatform = Bodies.rectangle(100, 100, 100, 40, { isStatic: true });
        this.state.rectangles.push(testPlatform)

        //add  stuffto world
        World.add(engine.world, [circle, boundaryRight, boundaryLeft, paddle, testPlatform])
        //run engine and renderer
        Engine.run(engine)
        Render.run(render)
        //create collision pair 
        let paddleCircle = [[paddle, circle]]

        //update state
        this.setState({ 
            render: render,
            paddle: paddle,
            ball: circle,
            running: true,
            paddleCircle: paddleCircle
        })

        //add, update, and delete rectangles over time after a three second delay
            this.addRectanglesInterval = setInterval(() => this.addRectangle(engine), 1000)
            this.updateInterval = setInterval(() => this.update(circle, paddle, paddleCircle, engine), .3)
            this.deleteRectanglesInterval = setInterval(this.deleteRectangles, .3)}, 3000)


    }
    //end of onMount


    //update function, called each .3 milliseconds
    update = (circle, paddle, paddleCircle, engine) => {

        this.lerpPosition(paddle,paddle.position.x,400,.005)
        // this.lerpRotation(paddle, this.convertDegreesToRadians(90), .005)
        for (const rect of this.state.rectangles) {

        // makes the rectangles fall from the top//
        Body.setPosition(rect, { x: rect.position.x, y: (rect.position.y) + .3 })

            if (this.isTouchingBottom(circle, rect, 25) && Detector.collisions(paddleCircle, engine)[0].collided) {
                console.log("is Crush")
                this.props.stopGame()
                clearInterval(this.updateInterval)
                clearInterval(this.deleteRectanglesInterval)
                clearInterval(this.addRectanglesInterval)
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
        // Body.setPosition(rect, {x:rect.position.x, y: (rect.position.y)+.3})
        Body.setPosition(body, { x: x, y: y })

    }
    lerpRotation(body, target, amount) {
        let angle = this.lerp(body.angle, target, amount)
        Body.rotate(body, angle)
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
        let testX = cx
        //always checking against bottom edge
        let testY = ry + rHeight
        //set left or right depending on location
        testX = this.setTest(testX, cx, rx, rWidth)
        //calc distance between edges and circle
        let distance = this.calcDistance(testX, testY, cx, cy)
        if (distance <= radius) {
            return true
        }
        return false
    }

    setTest = (test, c, r, w) => {
        if (c < r) {
            return r
        } else if (c > r + w) {
            return r + w
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
    convertDegreesToRadians = (degrees) => {
        return degrees * (pi / 180)
    }
    convertRadiansToDegrees = (radians) => {
        return radians * (180 / pi)
    }


    render() {
        return <div ref="scene" />
    }

}
export default Scene

