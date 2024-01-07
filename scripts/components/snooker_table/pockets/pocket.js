class Pocket {
    #body;
    constructor(xPos, yPos, radius) {
        const options = { isStatic: true };
        this.#body = Bodies.circle(xPos, yPos, radius, options);
        World.add(engine.world, this.#body);
    }

    isBodyPocket(body) {
        return body === this.#body;
    }

    draw() {
        drawVertices(this.#body.vertices);
    }
}