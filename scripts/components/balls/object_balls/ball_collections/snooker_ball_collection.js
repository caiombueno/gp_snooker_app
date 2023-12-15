/** 
 * Abstract class for ball collections on a Snooker game.
 */
class SnookerBallsCollection {
    constructor() {
        this._balls = [];
    }

    /** 
     * Handles the event when a red ball is potted.
     * 
     * Must be implemented on derived classes.
     */
    onBallPotted(body) {
        throw new UnimplementedError();
    }

    /** Check if a given body belongs to one of the balls from collection. */
    isBodyPartFromABallFromCollection(body) {
        return this._balls.some(ball => ball.body === body);
    }

    /** Removes all balls from the physical world. */
    removeFromWorld() {
        let bodies = [];

        for (let i = 0; i < this._balls.length; i++) {
            const body = this._balls[i].body;
            bodies.push(body);
        }

        World.remove(engine.world, bodies);
    }

    /** Draw all balls on the canvas. */
    draw() {
        for (let i = 0; i < this._balls.length; i++) {
            this._balls[i].draw();
        }
    }

    get balls() {
        return this._balls;
    }
}

