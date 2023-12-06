class SnookerTable {
    #xPos;
    #yPos;
    #width;
    #height;
    #railThickness;
    #tablePockets;

    constructor(xPos, yPos, width, world) {
        this.#xPos = xPos;
        this.#yPos = yPos;
        this.#width = width;
        this.#height = width / 2;
        this.#railThickness = 10;
        this.#tablePockets = new TablePockets(xPos, yPos, width, this.#height, this.#railThickness, world);
    }

    draw() {
        push();
        fill(80, 140, 52);
        stroke(72, 36, 12);
        strokeWeight(this.#railThickness);
        rect(this.#xPos, this.#yPos, this.#width, this.#height, 5);
        pop();

        this.#tablePockets.draw();
    }
}