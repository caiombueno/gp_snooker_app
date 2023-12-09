class SnookerTable {
    #xPos;
    #yPos;
    width;
    height;
    #railThickness;
    #tablePockets;
    #tableCushions;

    constructor(xPos, yPos, width, height) {
        this.#xPos = xPos;
        this.#yPos = yPos;
        this.width = width;
        this.height = height;
        this.#railThickness = 10;
        const pocketDiameter = (this.height / 36) * 1.5;
        this.#tablePockets = new TablePockets(xPos, yPos, width, height, pocketDiameter);

        this.#tableCushions = new TableCushions(xPos, yPos, width, height, this.#railThickness, pocketDiameter);
    }

    draw() {
        push();
        fill(80, 140, 52);
        stroke(72, 36, 12);
        strokeWeight(this.#railThickness);
        rect(this.#xPos, this.#yPos, this.width, this.height, 5);
        pop();

        this.#drawWhiteLines();

        this.#tableCushions.draw();
        this.#tablePockets.draw();
    }

    #drawWhiteLines() {
        push();
        const lineXPos = this.#xPos + this.width * 0.25;
        const lineStartYPos = this.#yPos + this.#railThickness;
        const lineEndYPos = this.#yPos + this.height - this.#railThickness;
        const centerYPos = this.#yPos + this.height * 0.5

        stroke(255);
        line(lineXPos, lineStartYPos, lineXPos, lineEndYPos);

        const radius = 50;
        const startAngle = HALF_PI;
        const endAngle = PI + HALF_PI;

        noFill();
        arc(lineXPos, centerYPos, radius * 2, radius * 2, startAngle, endAngle);
        pop();
    }
}

