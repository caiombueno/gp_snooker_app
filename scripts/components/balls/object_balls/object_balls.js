/** 
 * Represents a collection of object balls in a Snooker game. 
 * 
 * Object balls refer to the red and colored balls that players aim to pot during the game.
*/
class ObjectBalls {
    #tableMeasures;
    #playFieldDimensions;
    #arcProperties;
    #colouredBalls;
    #redBalls;
    #ballRadius;

    #startingPositionsModeId;
    #randomRedsOnlyModeId;
    #randomRedsAndColouredModeId;
    constructor({
        playFieldDimensions,
        arcProperties,
        ballRadius,
        startingPositionsModeId,
        randomRedsOnlyModeId,
        randomRedsAndColouredModeId
    }) {
        this.#playFieldDimensions = playFieldDimensions;
        // define the width and height of the table given the table's playfield dimensions
        this.#tableMeasures = { width: playFieldDimensions.endX - playFieldDimensions.initialX, height: playFieldDimensions.endY - playFieldDimensions.initialY };
        this.#arcProperties = arcProperties;
        this.#ballRadius = ballRadius;

        // the position mode IDs to allow the switching of modes later on
        this.#startingPositionsModeId = startingPositionsModeId;
        this.#randomRedsOnlyModeId = randomRedsOnlyModeId;
        this.#randomRedsAndColouredModeId = randomRedsAndColouredModeId;

        this.#setupBalls();
    }

    /** Draw the object balls on the canvas. */
    draw() {
        this.#colouredBalls.draw();
        this.#redBalls.draw();
    }

    /**
     * Change the positioning mode of the object balls.
     * The positioning mode determines the initial arrangement of the red and colored balls on the table.
     * 
     * Valid [positionModeId] options include one of mode IDs passed to the constructor:
     * - startingPositionsModeId: Balls are positioned at the start of a game.
     * - randomRedsOnlyModeId: Red balls are randomly placed on the table.
     * - randomRedsAndColouredModeId: Both red and colored balls are randomly placed on the table.
     */
    changeMode(positionModeId) {
        // remove all object balls from the physical world
        this.#removeFromWorld();
        // setup the balls using the provided [positionModeId]
        this.#setupBalls(positionModeId);
    }

    /** Handles the event when a red ball is potted. */
    onRedBallPotted(ball) {
        this.#redBalls.onBallPotted(ball);
    }

    /** Handles the event when a coloured ball is potted. */
    onColouredBallPotted(body) {
        this.#colouredBalls.onBallPotted(body);
    }

    /** Check if a given body is one of the red balls. */
    isBodyARedBall(body) {
        return this.#redBalls.isBodyPartFromABallFromCollection(body);
    }

    /** Check if a given body is one of the coloured balls. */
    isBodyAColouredBall(body) {
        return this.#colouredBalls.isBodyPartFromABallFromCollection(body);
    }

    /**
     * Set up the object balls based on the specified positioning mode.
     * 
     * If [positionMode] is not specified. Use the standard start positions of a Snooker game.
     */
    #setupBalls(positionMode = this.#startingPositionsModeId) {

        if (positionMode === this.#startingPositionsModeId || positionMode === this.#randomRedsOnlyModeId) {
            // calculate the x and y positions of the middle of the table
            const tableMiddlePosition = {
                x: this.#playFieldDimensions.initialX + this.#tableMeasures.width * 0.5,
                y: this.#playFieldDimensions.initialY + this.#tableMeasures.height * 0.5,
            };

            // coloured balls are set up on standard position either on starting positions and random reds only position modes
            this.#colouredBalls = ColouredBallCollection.standard({
                ballRadius: this.#ballRadius,
                arcMiddlePositionXPos: this.#arcProperties.centerX,
                arcRadius: this.#arcProperties.radius,
                tableMiddlePosition: tableMiddlePosition,
                tableWidth: this.#tableMeasures.width,
            });

            if (positionMode === this.#startingPositionsModeId) {
                // set up red balls as standard position as well
                this.#redBalls = RedBallCollection.standard({
                    xPos: this.#playFieldDimensions.initialX + this.#tableMeasures.width * 0.75,
                    yPos: tableMiddlePosition.y,
                    ballRadius: this.#ballRadius
                });

            } else if (positionMode === this.#randomRedsOnlyModeId) {
                // if position mode is random reds only, set up red balls on random positions
                this.#setupRandomlyPositionedRedBalls();
                this.#ensureUniqueBallPositions();
            }

        } else if (positionMode === this.#randomRedsAndColouredModeId) {
            // if position mode is random reds and coloured, set up both on random positions
            this.#setupRandomlyPositionedRedBalls();
            this.#colouredBalls = ColouredBallCollection.random({ playFieldDimensions: this.#playFieldDimensions, ballRadius: this.#ballRadius });
            this.#ensureUniqueBallPositions();
        }
    }

    #ensureUniqueBallPositions() {
        RandomlyPositionedBallCollectionHelper.ensureUniqueBallPositions({
            firstBallCollection: this.#redBalls,
            secondBallCollection: this.#colouredBalls,
            playFieldDimensions: this.#playFieldDimensions,
        });
    }

    /** Set up red balls on random positions within the playfield. */
    #setupRandomlyPositionedRedBalls() {
        this.#redBalls = RedBallCollection.random({ playFieldDimensions: this.#playFieldDimensions, ballRadius: this.#ballRadius });
    }

    /** Remove all object balls from the physical world. */
    #removeFromWorld() {
        this.#colouredBalls.removeFromWorld();
        this.#redBalls.removeFromWorld();
    }
}