/** The cushions for a Snooker table. */
class Cushions {
    #cushions;
    #cushionThickness;

    #xPos;
    #yPos;
    #tableWidth;
    #tableHeight;
    #railThickness;
    #pocketDiameter;

    constructor(xPos, yPos, tableWidth, tableHeight, railThickness, pocketDiameter) {
        // initialize private fields
        this.#xPos = xPos;
        this.#yPos = yPos;
        this.#tableWidth = tableWidth;
        this.#tableHeight = tableHeight;
        this.#railThickness = railThickness;
        this.#pocketDiameter = pocketDiameter;
        this.#cushionThickness = railThickness;

        this.#createCushions()
    }

    /** Create and add cushions to the world. */
    #createCushions() {
        this.#cushions = [];

        this.#createHorizontalCushions();

        this.#createVerticalCushions();

        World.add(engine.world, this.#cushions);
    }

    /** Create and add vertical cushions to the [this.#cushions] array. */
    #createVerticalCushions() {
        const verticalCushionYPos = this.#yPos + (this.#tableHeight / 2);
        const verticalCushionWidth = this.#tableHeight - (2 * this.#pocketDiameter);

        const verticalLeftCushion = this.#createNewCushion({
            x: this.#xPos + this.#railThickness,
            y: verticalCushionYPos,
            width: verticalCushionWidth,
            angle: HALF_PI,
        });

        const verticalRightCushion = this.#createNewCushion({
            x: this.#xPos + this.#tableWidth - this.#railThickness,
            y: verticalCushionYPos,
            width: verticalCushionWidth,
            angle: - HALF_PI,
        });

        this.#cushions.push(verticalLeftCushion, verticalRightCushion);
    }

    /** Create and add horizontal cushions to the [this.#cushions] array. */
    #createHorizontalCushions() {
        const horizontalLeftXPos = this.#xPos + (this.#tableWidth * 0.25) + (this.#pocketDiameter * 0.25);
        const horizontalRightXPos = this.#xPos + (this.#tableWidth * 0.75) - (this.#pocketDiameter * 0.25);
        const horizontalTopYPos = this.#yPos + this.#railThickness;
        const horizontalBottomYPos = this.#yPos + this.#tableHeight - this.#railThickness;
        const horizontalTrapezoidWidth = (this.#tableWidth / 2) - (this.#pocketDiameter * 1.5);

        // cushions' bodies
        const topLeftCushion = this.#createNewCushion({
            x: horizontalLeftXPos,
            y: horizontalTopYPos,
            width: horizontalTrapezoidWidth,
            angle: PI,
        });

        const topRightCushion = this.#createNewCushion({
            x: horizontalRightXPos,
            y: horizontalTopYPos,
            width: horizontalTrapezoidWidth,
            angle: PI,
        });

        const bottomLeftCushion = this.#createNewCushion({
            x: horizontalLeftXPos,
            y: horizontalBottomYPos,
            width: horizontalTrapezoidWidth,
        });

        const bottomRightCushion = this.#createNewCushion({
            x: horizontalRightXPos,
            y: horizontalBottomYPos,
            width: horizontalTrapezoidWidth,
        });

        this.#cushions.push(topLeftCushion, topRightCushion, bottomLeftCushion, bottomRightCushion);
    }

    /** Creates a new cushion with the given parameters. */
    #createNewCushion({
        x,
        y,
        width,
        angle = 0,
    }) {
        const defaultCushionOptions = { isStatic: true, restitution: 1, friction: 0.001, angle: angle };
        return Bodies.trapezoid(x, y, width, this.#cushionThickness, 0.08, defaultCushionOptions);
    }

    /** Retrieve the thickness of the cushions */
    get thickness() {
        return this.#cushionThickness;
    }

    /** Check if a given body is one of the cushions. */
    isBodyACushion(body) {
        return this.#cushions.includes(body);
    }

    /** Draw the cushions on the canvas. */
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