class Cushion {
    #body;
    constructor({ xPos, yPos, width, thickness, angle = 0 }) {
        const options = { isStatic: true, restitution: 2, friction: 0.001, angle: angle };
        this.#body = Bodies.trapezoid(xPos, yPos, width, thickness, 0.08, options);
        World.add(engine.world, this.#body);
    }

    isBodyCushion(body) {
        return body === this.#body;
    }

    draw() {
        drawVertices(this.#body.vertices);
    }
}