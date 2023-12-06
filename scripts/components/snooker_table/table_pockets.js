class TablePockets {
    #pockets; // private member

    constructor(xPos, yPos, tableWidth, tableHeight, railThickness, world) {
        const pocketDiameter = (tableHeight / 36) * 1.5;
        const pocketRadius = pocketDiameter / 2;
        const options = { isStatic: true };

        const halfRailThickness = railThickness / 2;

        const topLeftPocket = Bodies.circle(xPos + halfRailThickness, yPos + halfRailThickness, pocketRadius, options);

        const topRightPocket = Bodies.circle(xPos + tableWidth - halfRailThickness, yPos + halfRailThickness, pocketRadius, options);

        const bottomRightPocket = Bodies.circle(xPos + tableWidth - halfRailThickness, yPos + tableHeight - halfRailThickness, pocketRadius, options);

        const bottomLeftPocket = Bodies.circle(xPos + halfRailThickness, yPos + tableHeight - halfRailThickness, pocketRadius, options);

        const topMiddlePocket = Bodies.circle(xPos + tableWidth / 2, yPos + halfRailThickness, pocketRadius, options);

        const bottomMiddlePocket = Bodies.circle(xPos + tableWidth / 2, yPos + tableHeight - halfRailThickness, pocketRadius, options);

        this.#pockets = [topLeftPocket, topRightPocket, bottomRightPocket, bottomLeftPocket, topMiddlePocket, bottomMiddlePocket];

        World.add(world, this.#pockets);
    }

    draw() {
        push();
        fill(0);
        for (let i = 0; i < this.#pockets.length; i++) {
            drawVertices(this.#pockets[i].vertices);
        }
        pop();
    }

}