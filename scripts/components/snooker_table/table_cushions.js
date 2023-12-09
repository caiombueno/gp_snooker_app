class TableCushions {
    #cushions

    constructor(xPos, yPos, tableWidth, tableHeight, railThickness, pocketDiameter) {
        // layout calculations
        const trapezoidSlope = 0.08;

        const trapezoidHeight = railThickness;

        const horizontalLeftXPos = xPos + (tableWidth * 0.25) + (pocketDiameter * 0.25);

        const horizontalRightXPos = xPos + (tableWidth * 0.75) - (pocketDiameter * 0.25);

        const verticalLeftCushionXPos = xPos + railThickness;

        const verticalRightCushionXPos = xPos + tableWidth - railThickness;

        const horizontalTopYPos = yPos + railThickness;

        const horizontalBottomYPos = yPos + tableHeight - railThickness;

        const verticalCushionYPos = yPos + (tableHeight / 2);

        const horizontalTrapezoidWidth = (tableWidth / 2) - (pocketDiameter * 1.5);

        const verticalCushionWidth = tableHeight - (2 * pocketDiameter);

        const horizontalCushionOptions = { isStatic: true, restitution: 1 };

        const verticalCushionOptions = { isStatic: true, angle: Math.PI / 2 };

        // cushions' bodies
        const topLeftCushion = Bodies.trapezoid(horizontalLeftXPos, horizontalTopYPos, horizontalTrapezoidWidth, - trapezoidHeight, trapezoidSlope, horizontalCushionOptions);

        const topRightCushion = Bodies.trapezoid(horizontalRightXPos, horizontalTopYPos, horizontalTrapezoidWidth, - trapezoidHeight, trapezoidSlope, horizontalCushionOptions);

        const bottomLeftCushion = Bodies.trapezoid(horizontalLeftXPos, horizontalBottomYPos, horizontalTrapezoidWidth, trapezoidHeight, trapezoidSlope, horizontalCushionOptions);

        const bottomRightCushion = Bodies.trapezoid(horizontalRightXPos, horizontalBottomYPos, horizontalTrapezoidWidth, trapezoidHeight, trapezoidSlope, horizontalCushionOptions);

        const verticalLeftCushion = Bodies.trapezoid(verticalLeftCushionXPos, verticalCushionYPos, verticalCushionWidth, trapezoidHeight, trapezoidSlope, verticalCushionOptions);

        const verticalRightCushion = Bodies.trapezoid(verticalRightCushionXPos, verticalCushionYPos, verticalCushionWidth, - trapezoidHeight, trapezoidSlope, verticalCushionOptions);

        this.#cushions = [topLeftCushion, topRightCushion, bottomLeftCushion, bottomRightCushion, verticalLeftCushion, verticalRightCushion];

        World.add(engine.world, this.#cushions);
    }

    draw() {
        push();
        fill(52, 100, 32);
        noStroke();
        for (let i = 0; i < this.#cushions.length; i++) {
            drawVertices(this.#cushions[i].vertices);
        }
        pop();
    }

}