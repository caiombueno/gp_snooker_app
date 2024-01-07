/** The table for Snooker game with cushions, pockets, and markings.*/
class SnookerTable {
    #xPos;
    #yPos;
    #width;
    #height;
    #railThickness;
    #tablePockets;
    #tableCushions;
    #dArea;

    #tableRails;

    constructor(xPos, yPos, width, height) {
        // initialize private fields
        this.#xPos = xPos;
        this.#yPos = yPos;
        this.#width = width;
        this.#height = height;

        this.#railThickness = width / 100;
        const pocketDiameter = (this.#height / 36) * 1.5;
        this.#tablePockets = new TablePockets(xPos, yPos, width, height, pocketDiameter);

        this.#dArea = new DArea({
            tablePosition: { x: xPos, y: yPos },
            tableDimensions: { width: width, height: height },
            railThickness: this.#railThickness,
        });

        this.#tableCushions = new TableCushions(xPos, yPos, width, height, this.#railThickness, pocketDiameter);

        this.#tableRails = new TableRails({
            tableXPos: xPos,
            tableYPos: yPos,
            tableWidth: width,
            tableHeight: height,
            pocketDiameter: pocketDiameter,
            railThickness: this.#railThickness,
        });
    }

    /** The cushions for this table. */
    get cushions() { return this.#tableCushions; }

    /** The pockets for this table. */
    get pockets() { return this.#tablePockets; }

    /** The width of this table. */
    get width() { return this.#width; }

    get dArea() { return this.#dArea; }

    /** The play field dimensions of this table. */
    get playFieldDimensions() {
        const tableAndCushionThickness = this.#railThickness + this.#tableCushions.thickness;
        const initialX = this.#xPos + tableAndCushionThickness;
        const endX = this.#xPos + this.#width - tableAndCushionThickness;
        const initialY = this.#yPos + tableAndCushionThickness;
        const endY = this.#yPos + this.#height - tableAndCushionThickness;
        return {
            initialX: initialX,
            endX: endX,
            initialY: initialY,
            endY: endY,
            width: endX - initialX,
            height: endY - initialY,
        };
    }

    /** Draw the snooker table on the canvas. */
    draw() {
        // draw the table
        push();
        fill(80, 140, 52);
        stroke(248, 212, 76);
        strokeWeight(this.#railThickness);
        rect(this.#xPos, this.#yPos, this.#width, this.#height, 5);
        pop();


        this.#dArea.draw();

        this.#tableCushions.draw();
        this.#tablePockets.draw();
        this.#tableRails.draw();
    }
}