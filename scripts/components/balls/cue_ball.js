/** Represents the cue ball in a Snooker game. */
class CueBall extends Ball {
    #cue;
    #radius;
    #isOutOfTable;
    constructor(radius) {
        // calls the constructor of the parent class using the current mouse position.
        // the position doesn't matters for now since we won't add it to the world yet.
        super({
            x: mouseX,
            y: mouseY,
            radius: radius,
            addToWorld: false,
        });
        this.#radius = radius;
        Body.setMass(super.body, super.body.mass * 3);
        // sets up a new cue controller for managing cue interactions
        this.#cue = new CueController(this);
        // a flag indicating whether the cue ball is out of the table
        this.#isOutOfTable = true;
    }

    /** Draw the cue ball on the canvas. */
    draw() {
        if (!this.#isOutOfTable) {
            // if the cue ball is on the table, run the cue logic and draw the ball's physics body 
            this.#cue.run();
            super.draw();
        } else {
            // if the cue ball is out of the table, draw it at the mouse location
            this.#drawAtMouseLocation();
        }
    }

    /** Draw a no physics representation of the cue ball at the mouse location. */
    #drawAtMouseLocation() {
        const diameter = this.#radius * 2;
        ellipse(mouseX, mouseY, diameter, diameter);
    }

    /** Removes the cue ball from the table and from the physical world. */
    removeFromTable() {
        super.removeFromWorld();
        this.#isOutOfTable = true;
    }

    /** Add the cue ball to the physical world at the current mouse location. */
    placeOnTable() {
        this.#isOutOfTable = false;
        super.moveTo(mouseX, mouseY);
        World.add(engine.world, super.body);
    }

    /** A getter to check if the cue ball is currently out of the table. */
    get isOutOfTable() { return this.#isOutOfTable; }
}