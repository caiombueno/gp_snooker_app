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
        this.#xPos = xPos;
        this.#yPos = yPos;
        this.#width = width;
        this.#height = height;

        this.#railThickness = 10;
        const pocketDiameter = (this.#height / 36) * 1.5;
        this.#pockets = new TablePockets(xPos, yPos, width, height, pocketDiameter);

        this.#initializeArcProperties();

        this.#tableCushions = new TableCushions(xPos, yPos, width, height, this.#railThickness, pocketDiameter);
    }

    get cushions() { return this.#tableCushions; }

    get pockets() { return this.#pockets };

    get width() { return this.#width };

    get playFieldDimensions() {
        const tableAndCushionThickness = this.#railThickness + this.#tableCushions.thickness;
        return {
            initialX: this.#xPos + tableAndCushionThickness,
            endX: this.#xPos + this.#width - tableAndCushionThickness,
            initialY: this.#yPos + tableAndCushionThickness,
            endY: this.#yPos + this.#height - tableAndCushionThickness,
        };
    }

    get arcProperties() {
        return {
            x: this.#lineXPos,
            y: this.#centerYPos,
            radius: this.#whiteArcDiameter / 2,
        };
    }

    #initializeArcProperties() {
        this.#lineXPos = this.#xPos + this.#width * 0.25;
        this.#lineStartYPos = this.#yPos + this.#railThickness;
        this.#lineEndYPos = this.#yPos + this.#height - this.#railThickness;
        this.#centerYPos = this.#yPos + this.#height * 0.5
        this.#whiteArcDiameter = this.#height * 0.3;
        this.#arcStartAngle = 0.5 * PI;
        this.#arcEndAngle = 1.5 * PI;
    }

    draw() {
        push();
        fill(80, 140, 52);
        stroke(72, 36, 12);
        strokeWeight(this.#railThickness);
        rect(this.#xPos, this.#yPos, this.#width, this.#height, 5);
        pop();

        this.#drawWhiteLines();

        this.#tableCushions.draw();
        this.#pockets.draw();
    }

    #drawWhiteLines() {
        push();
        stroke(255);
        line(this.#lineXPos, this.#lineStartYPos, this.#lineXPos, this.#lineEndYPos);

        noFill();
        arc(this.#lineXPos, this.#centerYPos, this.#whiteArcDiameter, this.#whiteArcDiameter, this.#arcStartAngle, this.#arcEndAngle);
        pop();
    }
}

