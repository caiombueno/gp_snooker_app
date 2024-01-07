/** Represents a ball for a Snooker game. */
class Ball {
    #color;
    #ball;
    constructor({
        x,
        y,
        radius,
        color = window.color(255),
        addToWorld = true,
    }) {
        this.#color = color;

        const options = { restitution: 0.8, friction: 0.02, frictionAir: 0.02, mass: radius * 0.75 };
        // creates the ball
        this.#ball = Bodies.circle(x, y, radius, options);

        // add the ball to the physics world if specified
        if (addToWorld) {
            World.add(engine.world, this.#ball);
        }
    }

    /** The physics body of the ball. */
    get body() { return this.#ball };

    get position() {
        return { x: this.#ball.position.x, y: this.#ball.position.y };
    }

    moveTo(x, y) {
        Body.setPosition(this.body, { x: x, y: y });
        Body.setVelocity(this.body, { x: 0, y: 0 });
    }

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
