/** Manages the interaction between a given cue ball and the cue. */
class CueController {
    #cueBall;
    #cueBallPos;
    #cueBallRadius;
    #struckingAreaRadius
    #cue;
    #cueBallVelocityThreshold;

    constructor(cueBall) {
        // initialize private properties
        this.#cueBall = cueBall;
        this.#cueBallRadius = cueBall.body.circleRadius;
        this.#cueBallPos = cueBall.body.position;

        // the radius of the striking area in which the cue will be available for use
        this.#struckingAreaRadius = this.#cueBall.body.circleRadius * 30;

        // create the cue
        this.#cue = new Cue(this.#struckingAreaRadius, this.#cueBallRadius);

        // set a threshold for the cue ball's velocity to determine if it is not moving
        this.#cueBallVelocityThreshold = 0.01;
    }

    /** Run the cue controller logic and draw the cue. */
    run() {
        // the current cue ball position
        const cueBallXPos = this.#cueBallPos.x;
        const cueBallYPos = this.#cueBallPos.y;

        // calculate the distance between the mouse and the cue ball
        const mouseToCueBallDistance = dist(mouseX, mouseY, cueBallXPos, cueBallYPos);

        const isMouseCloseToCueBall = mouseToCueBallDistance < this.#struckingAreaRadius;


        // if mouse is close to the cue ball, draw the cue
        if (isMouseCloseToCueBall) {
            this.#cue.draw(cueBallXPos, cueBallYPos);

            // the user is only allowed to struck the ball if the cue ball is not moving or at a very low velocity
            const isCueBallNotMoving = Math.abs(this.#cueBall.body.velocity.x) < this.#cueBallVelocityThreshold && Math.abs(this.#cueBall.body.velocity.y) < this.#cueBallVelocityThreshold;
            if (mouseIsPressed && isCueBallNotMoving) {
                this.#strikeBall();
            }
        }
    }

    #strikeBall() {
        // calculate the force vector in the opposite direction of the mouse
        const direction = Matter.Vector.sub(this.#cueBallPos, { x: mouseX, y: mouseY });

        const forceScale = this.#cueBallRadius / 1000;


        const force = Matter.Vector.mult(direction, forceScale);

        // apply the force to the cue ball
        Body.applyForce(this.#cueBall.body, this.#cueBallPos, force);
    }
}