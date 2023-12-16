/** 
 * Represents the collection of coloured balls in a Snooker game. 
 * This class provides methods for creating standard or randomly positioned coloured balls.
*/
class ColouredBallCollection extends SnookerBallsCollection {
    constructor() {
        super();
    }

    /** Creates the coloured balls arranged as in a usual Snooker game. */
    static standard({ ballRadius, arcMiddlePositionXPos, arcRadius, tableMiddlePosition, tableWidth }) {
        return new StandardPositionedColouredBallCollection({
            ballRadius: ballRadius,
            arcMiddlePositionXPos: arcMiddlePositionXPos,
            arcRadius: arcRadius,
            tableMiddlePosition: tableMiddlePosition,
            tableWidth: tableWidth,
        });
    }

    /** Creates the coloured balls arranged randomly within the playfield area. */
    static random({ playFieldDimensions, ballRadius }) {
        return new RandomlyPositionedColouredBallCollection({
            playFieldDimensions: playFieldDimensions,
            ballRadius: ballRadius,
        });
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
}

/** Represents a collection of coloured balls arranged as in a usual Snooker game. */
class StandardPositionedColouredBallCollection extends ColouredBallCollection {
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
            x: tableMiddlePosition.x + tableWidth * 0.45,
            y: tableMiddlePosition.y,
            color: color(0),
        });

        this._balls = [greenBall, yellowBall, orangeBall, blueBall, pinkBall, blackBall];
    }

    /** Creates a coloured ball given a position and color.  */
    #newStandardPositionedBall({ x, y, color }) {
        return new ColouredBall({
            x: x,
            y: y,
            color: color,
            // all the coloured balls should have the same radius and keep their initiial position
            radius: this.#ballRadius,
        });
    }
}

/** Represents a collection of coloured balls arranged randomly within the playfield area. */
class RandomlyPositionedColouredBallCollection extends ColouredBallCollection {
    #ballRadius;
    #playFieldDimensions;
    constructor({ playFieldDimensions, ballRadius }) {
        super();
        this.#playFieldDimensions = playFieldDimensions;
        this.#ballRadius = ballRadius;

        const randomPositions = RandomlyPositionedBallCollectionHelper.getRandomPositionsWithinPlayfield(6, this.#playFieldDimensions);

        // creates each coloured ball in a random position
        const greenBall = this.#newRandomlyPositionedBall(color(0, 255, 0), randomPositions[0]);

        const yellowBall = this.#newRandomlyPositionedBall(color(255, 255, 0), randomPositions[1]);

        const orangeBall = this.#newRandomlyPositionedBall(color(255, 165, 0), randomPositions[2]);

        const blueBall = this.#newRandomlyPositionedBall(color(0, 0, 255), randomPositions[3]);

        const pinkBall = this.#newRandomlyPositionedBall(color(255, 192, 203), randomPositions[4]);

        const blackBall = this.#newRandomlyPositionedBall(color(0), randomPositions[5]);

        this._balls = [greenBall, yellowBall, orangeBall, blueBall, pinkBall, blackBall];
    }

    /** Creates a random ball given a color.  */
    #newRandomlyPositionedBall(color, randomPosition) {

        return new ColouredBall({
            // generates a random position within the playfield range
            x: randomPosition.x,
            y: randomPosition.y,
            color: color,
            // all the coloured balls should have the same radius and keep their initiial position
            radius: this.#ballRadius,
        });
    }
}

