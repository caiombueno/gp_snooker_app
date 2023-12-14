/** 
 * Represents the collection of red balls in a Snooker game. 
 * This class provides methods for creating standard or randomly positioned red balls.
*/
class RedBalls {
    constructor() {
        this._balls = [];
    }

    /** Creates the red balls arranged as in a usual Snooker game. */
    static standard({ xPos, yPos, ballRadius }) {
        return new StandardPositionedRedBalls({
            xPos: xPos,
            yPos: yPos,
            ballRadius: ballRadius
        });
    }

    /** Creates the red balls arranged randomly within the playfield area. */
    static random({ playFieldDimensions, ballRadius }) {
        return new RandomlyPositionedRedBalls({
            playFieldDimensions: playFieldDimensions,
            ballRadius: ballRadius,
        });
    }

    /** Check if a given body is one of the red balls. */
    isBodyARedBall(body) {
        return this._balls.some(ball => ball.body === body);
    }

    /** Handles the event when a red ball is potted. */
    onBallPotted(body) {
        // find the ball in the array given its body property
        const ball = this._balls.find(ball => ball.body === body);
        // if ball is found
        if (ball != null) {
            // remove the ball from the array
            this._balls = this._balls.filter(element => element !== ball);
            // remove the ball from the physical world
            World.remove(engine.world, ball.body);
        }
    }


    /** Removes all red balls from the physical world. */
    removeFromWorld() {
        let bodies = [];

        for (let i = 0; i < this._balls.length; i++) {
            const body = this._balls[i].body;
            bodies.push(body);
        }

        World.remove(engine.world, bodies);
    }

    /** Draw all red balls on the canvas. */
    draw() {
        for (let i = 0; i < this._balls.length; i++) {
            this._balls[i].draw();
        }
    }
}

/** Represents a collection of red balls arranged as in a usual Snooker game. */
class StandardPositionedRedBalls extends RedBalls {
    constructor({ xPos, yPos, ballRadius }) {
        super();
        const numRows = 5;
        const spacing = 15;

        // creates the red balls
        // the position of each ball is calculated so that they form a triangle shape
        for (let i = 1; i <= numRows; i++) {
            const yOffset = (yPos - i * spacing / 2) + ballRadius;

            for (let j = 0; j < i; j++) {
                const x = xPos + i * spacing;
                const y = yOffset + j * spacing;
                const redBall = new Ball({
                    x: x,
                    y: y,
                    radius: ballRadius,
                    color: color(255, 0, 0),
                });
                this._balls.push(redBall);
            }
        }
    }
}

/** Represents a collection of red balls arranged randomly within the playfield area. */
class RandomlyPositionedRedBalls extends RedBalls {
    constructor({ playFieldDimensions, ballRadius }) {
        super();
        const randomXRange = { min: playFieldDimensions.initialX, max: playFieldDimensions.endX };
        const randomYRange = { min: playFieldDimensions.initialY, max: playFieldDimensions.endY };

        for (let i = 0; i < 15; i++) {
            const redBall = new Ball({
                x: getRandomInt(randomXRange),
                y: getRandomInt(randomYRange),
                radius: ballRadius,
                color: color(255, 0, 0),
            });
            this._balls.push(redBall);
        }
    }
}