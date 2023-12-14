/** The table for Snooker game with cushions, pockets, and markings.*/
class SnookerTable {
    #xPos;
    #yPos;
    #width;
    #height;
    #railThickness;
    #pockets;
    #tableCushions;
    #lineXPos;
    #lineStartYPos;
    #lineEndYPos;
    #centerYPos;
    #whiteArcDiameter;
    #arcStartAngle;
    #arcEndAngle;

    constructor(xPos, yPos, width, height) {
        // initialize private fields
        this.#xPos = xPos;
        this.#yPos = yPos;
        this.#width = width;
        this.#height = height;

        this.#railThickness = 10;
        const pocketDiameter = (this.#height / 36) * 1.5;
        this.#pockets = new Pockets(xPos, yPos, width, height, pocketDiameter);

        this.#initializeBaulkArcProperties();

        this.#tableCushions = new Cushions(xPos, yPos, width, height, this.#railThickness, pocketDiameter);
    }

    /** The cushions for this table. */
    get cushions() { return this.#tableCushions; }

    /** The pockets for this table. */
    get pockets() { return this.#pockets };

    /** The width of this table. */
    get width() { return this.#width };

    /** The play field dimensions of this table. */
    get playFieldDimensions() {
        const tableAndCushionThickness = this.#railThickness + this.#tableCushions.thickness;
        return {
            initialX: this.#xPos + tableAndCushionThickness,
            endX: this.#xPos + this.#width - tableAndCushionThickness,
            initialY: this.#yPos + tableAndCushionThickness,
            endY: this.#yPos + this.#height - tableAndCushionThickness,
        };
    }

    /** The arc's x, y and radius for this table. */
    get baulkArcProperties() {
        return {
            x: this.#lineXPos,
            y: this.#centerYPos,
            radius: this.#whiteArcDiameter / 2,
        };
    }

    /** Calculates and initializes the propreties of the baulk arc. */
    #initializeBaulkArcProperties() {
        this.#lineXPos = this.#xPos + this.#width * 0.25;
        this.#lineStartYPos = this.#yPos + this.#railThickness;
        this.#lineEndYPos = this.#yPos + this.#height - this.#railThickness;
        this.#centerYPos = this.#yPos + this.#height * 0.5
        this.#whiteArcDiameter = this.#height * 0.3;
        this.#arcStartAngle = 0.5 * PI;
        this.#arcEndAngle = 1.5 * PI;
    }

    /** Draw the snooker table on the canvas. */
    draw() {
        // draw the table
        push();
        fill(80, 140, 52);
        stroke(72, 36, 12);
        strokeWeight(this.#railThickness);
        rect(this.#xPos, this.#yPos, this.#width, this.#height, 5);
        pop();

        this.#drawBaulkLines();

        this.#tableCushions.draw();
        this.#pockets.draw();
    }

    #drawBaulkLines() {
        // draw the vertical line
        push();
        stroke(255);
        line(this.#lineXPos, this.#lineStartYPos, this.#lineXPos, this.#lineEndYPos);

        // draw the arc
        noFill();
        arc(this.#lineXPos, this.#centerYPos, this.#whiteArcDiameter, this.#whiteArcDiameter, this.#arcStartAngle, this.#arcEndAngle);
        pop();
    }
}

