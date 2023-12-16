/** 
 * Represents the collection of red balls in a Snooker game. 
 * This class provides methods for creating standard or randomly positioned red balls.
*/
class RedBallCollection extends SnookerBallsCollection {
    constructor() {
        super();
    }

    /** Creates the red balls arranged as in a usual Snooker game. */
    static standard({ xPos, yPos, ballRadius }) {
        return new StandardPositionedRedBallCollection({
            xPos: xPos,
            yPos: yPos,
            ballRadius: ballRadius
        });
    }

    /** Creates the red balls arranged randomly within the playfield area. */
    static random({ playFieldDimensions, ballRadius }) {
        return new RandomlyPositionedRedBallCollection({
            playFieldDimensions: playFieldDimensions,
            ballRadius: ballRadius,
        });
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
}

/** Represents a collection of red balls arranged as in a usual Snooker game. */
class StandardPositionedRedBallCollection extends RedBallCollection {
    constructor({ xPos, yPos, ballRadius }) {
        super();
        const numRows = 5;
        // Adjust the initial spacing based on the ballRadius
        const initialSpacing = ballRadius * 2.5;
        const spacingFactor = 1; // You can adjust this factor based on your preferences

        // creates the red balls
        // the position of each ball is calculated so that they form a triangle shape
        for (let i = 1; i <= numRows; i++) {
            // Adjust the yOffset calculation based on the ballRadius
            const yOffset = (yPos - i * initialSpacing / 2) + ballRadius;

            for (let j = 0; j < i; j++) {
                // Adjust the x calculation based on the ballRadius
                const x = xPos + i * initialSpacing * spacingFactor;
                const y = yOffset + j * initialSpacing;
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
class RandomlyPositionedRedBallCollection extends RedBallCollection {
    constructor({ playFieldDimensions, ballRadius }) {
        super();
        const numberOfBalls = 15;
        const randomPositions = RandomlyPositionedBallCollectionHelper.getRandomPositionsWithinPlayfield(numberOfBalls, playFieldDimensions);

        for (let i = 0; i < numberOfBalls; i++) {
            const redBall = new Ball({
                x: randomPositions[i].x,
                y: randomPositions[i].y,
                radius: ballRadius,
                color: color(255, 0, 0),
            });
            this._balls.push(redBall);
        }
    }
}