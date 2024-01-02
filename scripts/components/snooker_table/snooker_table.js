/** The table for Snooker game with cushions, pockets, and markings.*/
class SnookerTable {
    #xPos;
    #yPos;
    #width;
    #height;
    #railThickness;
    #pockets;
    #tableCushions;

    #baulk;


    constructor(xPos, yPos, width, height) {
        // initialize private fields
        this.#xPos = xPos;
        this.#yPos = yPos;
        this.#width = width;
        this.#height = height;

        this.#railThickness = width / 100;
        const pocketDiameter = (this.#height / 36) * 1.5;
        this.#pockets = new Pockets(xPos, yPos, width, height, pocketDiameter);

        this.#baulk = new Baulk({
            tablePosition: { x: xPos, y: yPos },
            tableDimensions: { width: width, height: height },
            railThickness: this.#railThickness,
        });

        this.#tableCushions = new Cushions(xPos, yPos, width, height, this.#railThickness, pocketDiameter);
    }

    /** The cushions for this table. */
    get cushions() { return this.#tableCushions; }

    /** The pockets for this table. */
    get pockets() { return this.#pockets; }

    /** The width of this table. */
    get width() { return this.#width; }

    get baulk() { return this.#baulk; }

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
        stroke(72, 36, 12);
        strokeWeight(this.#railThickness);
        rect(this.#xPos, this.#yPos, this.#width, this.#height, 5);
        pop();

        this.#baulk.draw();

        this.#tableCushions.draw();
        this.#pockets.draw();
    }
}

class Baulk {
    #lineXPos;
    #lineStartYPos;
    #lineEndYPos;
    #centerYPos;
    #whiteArcDiameter;
    #arcStartAngle;
    #arcEndAngle;
    constructor({ tablePosition, tableDimensions, railThickness }) {
        // Calculates and initializes the propreties of the baulk arc.
        this.#lineXPos = tablePosition.x + tableDimensions.width * 0.25;
        this.#lineStartYPos = tablePosition.y + railThickness;
        this.#lineEndYPos = tablePosition.y + tableDimensions.height - railThickness;
        this.#centerYPos = tablePosition.y + tableDimensions.height * 0.5
        this.#whiteArcDiameter = tableDimensions.height * 0.3;
        this.#arcStartAngle = 0.5 * PI;
        this.#arcEndAngle = 1.5 * PI;
    }

    /** The arc's x, y and radius. */
    get arcProperties() {
        return {
            centerX: this.#lineXPos,
            centerY: this.#centerYPos,
            radius: this.#whiteArcDiameter / 2,
        };
    }

    // check if an object is within the semicircular arc
    isObjectWithinArc(objectPosition) {
        // calculate the distance between the object and the center of the arc
        const distance = dist(objectPosition.x, objectPosition.y, this.arcProperties.centerX, this.arcProperties.centerY);

        // check if the distance is within the radius of the arc
        if (distance <= this.arcProperties.radius) {
            // calculate the angle of the object in relation to the center of the arc
            const angle = atan2(objectPosition.y - this.arcProperties.centerY, objectPosition.x - this.arcProperties.centerX);

            // check if the angle is within the range of the arc
            if (this.#arcStartAngle < this.#arcEndAngle) {
                return angle >= this.#arcStartAngle && angle <= this.#arcEndAngle;
            } else {
                return angle >= this.#arcStartAngle || angle <= this.#arcEndAngle;
            }
        }

        return false;
    }

    draw() {
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
