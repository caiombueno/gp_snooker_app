/** The cue stick used in a Snooker game. */
class Cue {
    #cueBallRadiusWithDistance;
    #cueStickWidth;
    #cueTipWidth;
    #cueHeight;
    #cueXPos;
    #cueYPos;
    constructor(width, cueBallRadius) {
        // The distance between the cue stick and the cue ball
        const cueDistance = 5;

        // set private properties
        this.#cueBallRadiusWithDistance = cueBallRadius + cueDistance;
        this.#cueStickWidth = width - this.#cueBallRadiusWithDistance;
        this.#cueTipWidth = 5;
        this.#cueHeight = this.#cueStickWidth * 0.025;
        this.#cueXPos = 0;
        this.#cueYPos = - this.#cueHeight * 0.5;
    }

    /** Draw the cue stick based on the given the parameters. */
    draw(xPos, yPos) {
        push();
        // calculate the angle between the cue ball and the mouse position
        const mouseVector = createVector(mouseX, mouseY);
        const angle = atan2(mouseVector.y - yPos, mouseVector.x - xPos);

        // calculate orbiting object position
        const cueXPos = xPos + this.#cueBallRadiusWithDistance * cos(angle);
        const cueYPos = yPos + this.#cueBallRadiusWithDistance * sin(angle);

        translate(cueXPos, cueYPos);
        rotate(angle);

        stroke(this.#cueHeight) /

            // draw the main part of the cue stick
            fill(139, 69, 19);
        rect(this.#cueXPos, this.#cueYPos, this.#cueStickWidth, this.#cueHeight);

        // draw the cue tip
        fill(0);
        rect(this.#cueXPos, this.#cueYPos, this.#cueTipWidth, this.#cueHeight);
        pop();
    }
}