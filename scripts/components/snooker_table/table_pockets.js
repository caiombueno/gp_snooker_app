class TablePockets {
    #bodies;

    constructor(xPos, yPos, tableWidth, tableHeight, pocketDiameter) {

        const pocketRadius = pocketDiameter / 2;

        const options = { isStatic: true };

        const topLeftPocket = Bodies.circle(xPos + pocketRadius, yPos + pocketRadius, pocketRadius, options);

        const topRightPocket = Bodies.circle(xPos + tableWidth - pocketRadius, yPos + pocketRadius, pocketRadius, options);

        const bottomRightPocket = Bodies.circle(xPos + tableWidth - pocketRadius, yPos + tableHeight - pocketRadius, pocketRadius, options);

        const bottomLeftPocket = Bodies.circle(xPos + pocketRadius, yPos + tableHeight - pocketRadius, pocketRadius, options);

        const topMiddlePocket = Bodies.circle(xPos + tableWidth / 2, yPos + pocketRadius, pocketRadius, options);

        const bottomMiddlePocket = Bodies.circle(xPos + tableWidth / 2, yPos + tableHeight - pocketRadius, pocketRadius, options);

        this.#bodies = [topLeftPocket, topRightPocket, bottomRightPocket, bottomLeftPocket, topMiddlePocket, bottomMiddlePocket];

        World.add(engine.world, this.#bodies);
    }

    isBodyACushion(body) {
        return this.#bodies.includes(body);
    }

    draw() {
        push();
        fill(0);
        for (let i = 0; i < this.#bodies.length; i++) {
            drawVertices(this.#bodies[i].vertices);
        }
        pop();
    }

}