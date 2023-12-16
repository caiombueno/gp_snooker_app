/** Manages the interaction between a given cue ball and the cue. */
class CueController {
    #cueBallBody;
    #struckingAreaRadius
    #cue;
    #cueBallVelocityThreshold;

    constructor(cueBall) {
        // initialize private properties
        this.#cueBallBody = cueBall.body;

        // the radius of the striking area in which the cue will be available for use
        this.#struckingAreaRadius = this.#cueBallBody.circleRadius * 30;

        // create the cue
        this.#cue = new Cue(this.#struckingAreaRadius, this.#cueBallBody.circleRadius);

        // set a threshold for the cue ball's velocity to determine if it is not moving
        this.#cueBallVelocityThreshold = 0.01;
    }

    /** Run the cue controller logic and draw the cue. */
    run() {
        // the current cue ball position
        const cueBallXPos = this.#cueBallBody.position.x;
        const cueBallYPos = this.#cueBallBody.position.y;

        // calculate the distance between the mouse and the cue ball
        const mouseToCueBallDistance = dist(mouseX, mouseY, cueBallXPos, cueBallYPos);

        const isMouseCloseToCueBall = mouseToCueBallDistance < this.#struckingAreaRadius;


        // if mouse is close to the cue ball, draw the cue
        if (isMouseCloseToCueBall) {
            this.#cue.draw(cueBallXPos, cueBallYPos);

            // the user is only allowed to struck the ball if the cue ball is not moving or at a very low velocity
            const isCueBallNotMoving = Math.abs(this.#cueBallBody.velocity.x) < this.#cueBallVelocityThreshold && Math.abs(this.#cueBallBody.velocity.y) < this.#cueBallVelocityThreshold;
            if (mouseIsPressed && isCueBallNotMoving) {
                this.#strikeBall();
            }
        }
    }

    #strikeBall() {
        // calculate the force vector in the opposite direction of the mouse
        const forceX = this.#cueBallBody.position.x - mouseX;
        const forceY = this.#cueBallBody.position.y - mouseY;
        const forceScale = 0.0002 * this.#cueBallBody.mass;

        // apply the force to the cue ball
        Body.applyForce(this.#cueBallBody, this.#cueBallBody.position, { x: forceX * forceScale, y: forceY * forceScale });
    }
}