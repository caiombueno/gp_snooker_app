class CueBall extends Ball {
    #cue;
    #radius;
    #isPotted;
    constructor(x, y, radius) {
        super(mouseX, mouseY, radius);
        this.#radius = radius;
        this.#cue = new CueController(this);

        this.pot();

    }

    draw() {
        if (!this.#isPotted) {
            this.#cue.run();
            super.draw();
        } else {
            this.drawAtMouseLocation();
        }
    }

    drawAtMouseLocation() {
        ellipse(mouseX, mouseY, this.#radius * 2, this.#radius * 2);
    }

    pot() {
        super.removeFromWorld();
        this.drawAtMouseLocation();
        this.#isPotted = true;
    }

    unpot() {
        this.#isPotted = false;
        Body.setPosition(super.body, { x: mouseX, y: mouseY });
        Body.setVelocity(super.body, { x: 0, y: 0 });
        World.add(engine.world, super.body);
    }

    get isPotted() { return this.#isPotted; }
}