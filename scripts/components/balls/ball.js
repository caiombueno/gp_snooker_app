/** Represents a ball for a Snooker game. */
class Ball {
    #color;
    #ball;
    #initialPosition;
    constructor({
        x,
        y,
        radius,
        color = window.color(255),
        keepInitialPosition = false,
        addToWorld = true,
    }) {
        this.#color = color;

        const options = { restitution: 1.2, friction: 0.001, frictionAir: 0.015 };
        // creates the ball
        this.#ball = Bodies.circle(x, y, radius, options);

        // add the ball to the physics world if specified
        if (addToWorld) {
            World.add(engine.world, this.#ball);
        }

        // store the initial position if specified
        if (keepInitialPosition) {
            this.#initialPosition = { x: x, y: y };
        }
    }

    /** The physics body of the ball. */
    get body() { return this.#ball };

    get initialPosition() { return this.#initialPosition; }

    /** Remove the ball from the physics world. */
    removeFromWorld() {
        World.remove(engine.world, this.#ball);
    }

    /** Draw the ball on the canvas. */
    draw() {
        push();
        fill(this.#color);
        drawVertices(this.#ball.vertices);
        pop();
    }
}

