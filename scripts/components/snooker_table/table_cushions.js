class TableCushions {
    #cushions;
    #cushionThickness;

    constructor(xPos, yPos, tableWidth, tableHeight, railThickness, pocketDiameter) {
        // layout calculations
        const trapezoidSlope = 0.08;

        this.#cushionThickness = railThickness;

        const horizontalLeftXPos = xPos + (tableWidth * 0.25) + (pocketDiameter * 0.25);

        const horizontalRightXPos = xPos + (tableWidth * 0.75) - (pocketDiameter * 0.25);

        const verticalLeftCushionXPos = xPos + railThickness;

        const verticalRightCushionXPos = xPos + tableWidth - railThickness;

        const horizontalTopYPos = yPos + railThickness;

        const horizontalBottomYPos = yPos + tableHeight - railThickness;

        const verticalCushionYPos = yPos + (tableHeight / 2);

        const horizontalTrapezoidWidth = (tableWidth / 2) - (pocketDiameter * 1.5);

        const verticalCushionWidth = tableHeight - (2 * pocketDiameter);

        const defaultCushionOptions = { isStatic: true, restitution: 1, friction: 0.001, };

        const horizontalTopCushionOptions = { ...defaultCushionOptions, angle: PI };

        const verticalCushionOptions = { ...defaultCushionOptions, angle: HALF_PI };

        // cushions' bodies
        const topLeftCushion = Bodies.trapezoid(horizontalLeftXPos, horizontalTopYPos, horizontalTrapezoidWidth, this.#cushionThickness, trapezoidSlope, horizontalTopCushionOptions);

        const topRightCushion = Bodies.trapezoid(horizontalRightXPos, horizontalTopYPos, horizontalTrapezoidWidth, this.#cushionThickness, trapezoidSlope, horizontalTopCushionOptions);

        const bottomLeftCushion = Bodies.trapezoid(horizontalLeftXPos, horizontalBottomYPos, horizontalTrapezoidWidth, this.#cushionThickness, trapezoidSlope, defaultCushionOptions);

        const bottomRightCushion = Bodies.trapezoid(horizontalRightXPos, horizontalBottomYPos, horizontalTrapezoidWidth, this.#cushionThickness, trapezoidSlope, defaultCushionOptions);

        const verticalLeftCushion = Bodies.trapezoid(verticalLeftCushionXPos, verticalCushionYPos, verticalCushionWidth, this.#cushionThickness, trapezoidSlope, verticalCushionOptions);

        const verticalRightCushion = Bodies.trapezoid(verticalRightCushionXPos, verticalCushionYPos, verticalCushionWidth, - this.#cushionThickness, trapezoidSlope, verticalCushionOptions);

        this.#cushions = [topLeftCushion, topRightCushion, bottomLeftCushion, bottomRightCushion, verticalLeftCushion, verticalRightCushion];

        World.add(engine.world, this.#cushions);
    }

    get thickness() {
        return this.#cushionThickness;
    }

    isBodyACushion(body) {
        return this.#cushions.includes(body);
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