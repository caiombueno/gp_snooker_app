/** 
 * Represents the collection of coloured balls in a Snooker game. 
 * This class provides methods for creating standard or randomly positioned coloured balls.
*/
class ColouredBalls {

    /** Creates the coloured balls arranged as in a usual Snooker game. */
    static standard({ ballRadius, arcMiddlePositionXPos, arcRadius, tableMiddlePosition, tableWidth }) {
        return new StandardPositionedColouredBalls({
            ballRadius: ballRadius,
            arcMiddlePositionXPos: arcMiddlePositionXPos,
            arcRadius: arcRadius,
            tableMiddlePosition: tableMiddlePosition,
            tableWidth: tableWidth,
        });
    }

    /** Creates the coloured balls arranged randomly within the playfield area. */
    static random({ playFieldDimensions, ballRadius }) {
        return new RandomlyPositionedColouredBalls({
            playFieldDimensions: playFieldDimensions,
            ballRadius: ballRadius,
        });
    }

    /** Check if a given body is one of the coloured balls. */
    isBodyAColouredBall(body) {
        return this._balls.some(ball => ball.body === body);
    }

    /** Handles the event when a coloured ball is potted. */
    onBallPotted(body) {
        // find the ball in the array given its body property
        const ball = this._balls.find(ball => ball.body === body);
        // if ball is found
        if (ball != null) {
            const body = ball.body;
            // sets the ball's velocity and speed to 0
            Body.setVelocity(body, { x: 0, y: 0 });
            Body.setSpeed(body, 0);
            // moves the ball back to its initial position
            Body.setPosition(body, ball.initialPosition);
        }
    }

    /** Removes all coloured balls from the physical world. */
    removeFromWorld() {
        let bodies = [];

        for (let i = 0; i < this._balls.length; i++) {
            const body = this._balls[i].body;
            bodies.push(body);
        }

        World.remove(engine.world, bodies);
    }

    /** Draw all coloured balls on the canvas. */
    draw() {
        for (let i = 0; i < this._balls.length; i++) {
            this._balls[i].draw();
        }
    }
}

/** Represents a collection of coloured balls arranged as in a usual Snooker game. */
class StandardPositionedColouredBalls extends ColouredBalls {
    #ballRadius;
    constructor({ ballRadius, arcMiddlePositionXPos, arcRadius, tableMiddlePosition, tableWidth }) {
        super();
        this.#ballRadius = ballRadius;

        // creates each coloured ball in its correct position on the table

        const greenBall = this.#newStandardPositionedBall({
            x: arcMiddlePositionXPos,
            y: tableMiddlePosition.y - arcRadius,
            color: color(0, 255, 0),
        });

        const yellowBall = this.#newStandardPositionedBall({
            x: arcMiddlePositionXPos,
            y: tableMiddlePosition.y + arcRadius,
            color: color(255, 255, 0),
        });

        const orangeBall = this.#newStandardPositionedBall({
            x: arcMiddlePositionXPos,
            y: tableMiddlePosition.y,
            color: color(255, 165, 0),
        });

        const blueBall = this.#newStandardPositionedBall({
            x: tableMiddlePosition.x,
            y: tableMiddlePosition.y,
            color: color(0, 0, 255),
        });

        const pinkBall = this.#newStandardPositionedBall({
            x: tableMiddlePosition.x + tableWidth * 0.25,
            y: tableMiddlePosition.y,
            color: color(255, 192, 203),
        });

        const blackBall = this.#newStandardPositionedBall({
            x: tableMiddlePosition.x + tableWidth * 0.4,
            y: tableMiddlePosition.y,
            color: color(0),
        });

        this._balls = [greenBall, yellowBall, orangeBall, blueBall, pinkBall, blackBall];
    }

    /** Creates a coloured ball given a position and color.  */
    #newStandardPositionedBall({ x, y, color }) {
        return new Ball({
            x: x,
            y: y,
            color: color,
            // all the coloured balls should have the same radius and keep their initiial position
            radius: this.#ballRadius,
            keepInitialPosition: true,
        });
    }
}

/** Represents a collection of coloured balls arranged randomly within the playfield area. */
class RandomlyPositionedColouredBalls extends ColouredBalls {
    #ballRadius;
    #randomXRange;
    #randomYRange;
    constructor({ playFieldDimensions, ballRadius }) {
        super();
        this.#randomXRange = { min: playFieldDimensions.initialX, max: playFieldDimensions.endX };
        this.#randomYRange = { min: playFieldDimensions.initialY, max: playFieldDimensions.endY };
        this.#ballRadius = ballRadius;

        // creates each coloured ball in a random position
        const greenBall = this.#newRandomlyPositionedBall(color(0, 255, 0));

        const yellowBall = this.#newRandomlyPositionedBall(color(255, 255, 0));

        const orangeBall = this.#newRandomlyPositionedBall(color(255, 165, 0));

        const blueBall = this.#newRandomlyPositionedBall(color(0, 0, 255));

        const pinkBall = this.#newRandomlyPositionedBall(color(255, 192, 203));

        const blackBall = this.#newRandomlyPositionedBall(color(0));

        this._balls = [greenBall, yellowBall, orangeBall, blueBall, pinkBall, blackBall];
    }

    /** Creates a random ball given a color.  */
    #newRandomlyPositionedBall(color) {
        return new Ball({
            // generates a random position within the playfield range
            x: getRandomInt(this.#randomXRange),
            y: getRandomInt(this.#randomYRange),
            color: color,
            // all the coloured balls should have the same radius and keep their initiial position
            radius: this.#ballRadius,
            keepInitialPosition: true,
        });
    }
}