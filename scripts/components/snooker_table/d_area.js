/** 
 * The D area on a snooker table, which includes both the D (semicircular region)
 * and the D-line (straight line marking its boundary). 
 */
class DArea {
    #lineXPos;
    #lineStartYPos;
    #lineEndYPos;
    #centerYPos;
    #whiteArcDiameter;
    #arcStartAngle;
    #arcEndAngle;
    constructor({ tablePosition, tableDimensions, railThickness }) {
        // calculates and initializes the propreties of the D arc.
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

    /** Check if an object is within the D arc. */
    isObjectWithinArc(xPos, yPos) {
        // calculate the distance between the object and the center of the arc
        const distance = dist(xPos, yPos, this.arcProperties.centerX, this.arcProperties.centerY);

        // check if the distance is within the radius of the arc
        if (distance <= this.arcProperties.radius) {

            // calculate the angle of the object in relation to the center of the arc
            let angle = atan2(yPos - this.arcProperties.centerY, xPos - this.arcProperties.centerX);
            angle = (angle + TWO_PI) % TWO_PI; // ensure angle is in the range [0, 2*PI)

            return angle >= this.#arcStartAngle && angle <= this.#arcEndAngle;
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