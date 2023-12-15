/** Represents the cue ball in a Snooker game. */
class ColouredBall extends Ball {
    #initialPosition;
    constructor({
        x,
        y,
        radius,
        color,
        addToWorld = true
    }) {
        super({
            x: x,
            y: y,
            radius: radius,
            color: color,
            addToWorld: addToWorld,
        });
        // save the position the ball was placed initially
        this.#initialPosition = { x: x, y: y };
    }

    get initialPosition() { return this.#initialPosition; }
}
