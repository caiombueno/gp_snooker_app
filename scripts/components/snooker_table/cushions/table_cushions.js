/** The cushions for a Snooker table. */
class TableCushions {
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
    }

    /** Create and add vertical cushions to the [#cushions] array. */
    #createVerticalCushions() {
        const yPos = this.#yPos + (this.#tableHeight / 2);
        const width = this.#tableHeight - (2 * this.#pocketDiameter);

        const leftCushion = this.#createNewCushion({
            x: this.#xPos + this.#railThickness,
            y: yPos,
            width: width,
            angle: HALF_PI,
        });

        const rightCushion = this.#createNewCushion({
            x: this.#xPos + this.#tableWidth - this.#railThickness,
            y: yPos,
            width: width,
            angle: - HALF_PI,
        });

        this.#cushions.push(leftCushion, rightCushion);
    }

    /** Create and add horizontal cushions to the [#cushions] array. */
    #createHorizontalCushions() {
        const leftXPos = this.#xPos + (this.#tableWidth * 0.25) + (this.#pocketDiameter * 0.25);
        const rightXPos = this.#xPos + (this.#tableWidth * 0.75) - (this.#pocketDiameter * 0.25);
        const topYPos = this.#yPos + this.#railThickness;
        const bottomYPos = this.#yPos + this.#tableHeight - this.#railThickness;
        const width = (this.#tableWidth / 2) - (this.#pocketDiameter * 1.5);

        // cushions' bodies
        const topLeftCushion = this.#createNewCushion({
            x: leftXPos,
            y: topYPos,
            width: width,
            angle: PI,
        });

        const topRightCushion = this.#createNewCushion({
            x: rightXPos,
            y: topYPos,
            width: width,
            angle: PI,
        });

        const bottomLeftCushion = this.#createNewCushion({
            x: leftXPos,
            y: bottomYPos,
            width: width,
        });

        const bottomRightCushion = this.#createNewCushion({
            x: rightXPos,
            y: bottomYPos,
            width: width,
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
        return new Cushion({
            xPos: x,
            yPos: y,
            width: width,
            thickness: this.#cushionThickness,
            angle: angle,
        });
    }

    /** Retrieve the thickness of the cushions */
    get thickness() {
        return this.#cushionThickness;
    }

    /** Check if a given body is one of the cushions. */
    isBodyACushion(body) {
        for (let i = 0; i < this.#cushions.length; i++) {
            if (this.#cushions[i].isBodyCushion(body)) {
                return true;
            }
        }
        return false;
    }

    /** Draw the cushions on the canvas. */
    draw() {
        push();
        fill(52, 100, 32);
        noStroke();
        for (let i = 0; i < this.#cushions.length; i++) {
            this.#cushions[i].draw();
        }
        pop();
    }
}