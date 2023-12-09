class CueController {
    constructor(cueBall) {
        this.cueBall = cueBall;
        this.struckingAreaRadius = 100;

        this.cue = new Cue(this.struckingAreaRadius);

        this.cueBallVelocityThreshold = 0.01;
    }

    draw() {
        const cueBallXPos = this.cueBall.position.x;
        const cueBallYPos = this.cueBall.position.y;

        const mouseToCueBallDistance = dist(mouseX, mouseY, cueBallXPos, cueBallYPos);

        const isMouseCloseToCueBall = mouseToCueBallDistance < this.struckingAreaRadius;


        if (isMouseCloseToCueBall) {
            this.cue.draw(cueBallXPos, cueBallYPos);

            const isCueBallNotMoving = Math.abs(this.cueBall.velocity.x) < this.cueBallVelocityThreshold && Math.abs(this.cueBall.velocity.y) < this.cueBallVelocityThreshold;
            if (mouseIsPressed && isCueBallNotMoving) {
                this.#struckBall();
            }
        }
    }

    #struckBall() {
        // Calculate the force vector in the opposite direction of the mouse
        const forceX = this.cueBall.position.x - mouseX;
        const forceY = this.cueBall.position.y - mouseY;
        const forceScale = 1 / 10000;

        // Apply the force to the cue ball
        Body.applyForce(this.cueBall, this.cueBall.position, { x: forceX * forceScale, y: forceY * forceScale });
    }
}