class Ball {
    #fillColor;
    #body;
    #initialPosition
    constructor(
        x,
        y,
        radius,
        fillColor = color(255),
        keepInitialPosition = false,
    ) {
        this.#fillColor = fillColor;
        const options = { restitution: 1.2, friction: 0.001, frictionAir: 0.015 };
        this.#body = Bodies.circle(x, y, radius, options);
        World.add(engine.world, [this.#body]);

        if (keepInitialPosition) {
            this.#initialPosition = { x: x, y: y };
        }
    }

    get body() { return this.#body };

    get initialPosition() { return this.#initialPosition; }

    isInWorld() {
        return engine.world.bodies.includes(this.#body);
    }

    removeFromWorld() {
        World.remove(engine.world, this.#body);
    }

    draw() {
        push();
        fill(this.#fillColor);
        drawVertices(this.#body.vertices);
        pop();
    }
}

