class Rail {
    #body;

    constructor({ xPos, yPos, width, height, angle = 0 }) {
        const options = { isStatic: true, angle: angle };
        this.#body = Bodies.rectangle(xPos, yPos, width, height, options);
        World.add(engine.world, this.#body);
    }

    draw() {
        push();
        fill(72, 36, 12);
        drawVertices(this.#body.vertices);
        pop();
    }
}