class ObjectBalls {
    #tableMeasures;
    #playFieldDimensions;
    #arcProperties;
    #colouredBalls;
    #redBalls;
    #ballRadius;
    constructor({
        playFieldDimensions,
        arcProperties,
        ballRadius
    }) {
        this.#playFieldDimensions = playFieldDimensions;
        this.#tableMeasures = { width: playFieldDimensions.endX - playFieldDimensions.initialX, height: playFieldDimensions.endY - playFieldDimensions.initialY };
        this.#arcProperties = arcProperties;
        this.#ballRadius = ballRadius;

        this.#setupBalls();
    }

    draw() {
        this.#colouredBalls.draw();
        this.#redBalls.draw();
    }

    changeMode(positionMode) {
        this.#removeFromWorld();
        this.#setupBalls(positionMode);
    }

    onRedBallPotted(ball) {
        this.#redBalls.onBallPotted(ball);
    }

    onColouredBallPotted(body) {
        this.#colouredBalls.onBallPotted(body);
    }

    isBodyARedBall(body) {
        return this.#redBalls.isBodyARedBall(body);
    }

    isBodyAColouredBall(body) {
        return this.#colouredBalls.isBodyAColouredBall(body);
    }

    #setupBalls(positionMode = 'starting_positions') {
        if (positionMode === 'starting_positions' || positionMode === 'random_reds_only') {
            const tableMiddlePosition = {
                x: this.#playFieldDimensions.initialX + this.#tableMeasures.width * 0.5,
                y: this.#playFieldDimensions.initialY + this.#tableMeasures.height * 0.5,
            };
            this.#colouredBalls = ColouredBalls.standard({
                ballRadius: this.#ballRadius,
                arcMiddlePositionXPos: this.#arcProperties.x,
                arcRadius: this.#arcProperties.radius,
                tableMiddlePosition: tableMiddlePosition,
                tableWidth: this.#tableMeasures.width,
            });
            if (positionMode === 'starting_positions') {
                this.#redBalls = RedBalls.standard({
                    xPos: this.#playFieldDimensions.initialX + this.#tableMeasures.width * 0.75,
                    yPos: tableMiddlePosition.y,
                    ballRadius: this.#ballRadius
                });

            } else if (positionMode === 'random_reds_only') {

                this.#setupRandomlyPositionedRedBalls();

            }

        } else if (positionMode === 'random_reds_and_coloured') {

            this.#setupRandomlyPositionedRedBalls();
            this.#colouredBalls = ColouredBalls.random({ playFieldDimensions: this.#playFieldDimensions, ballRadius: this.#ballRadius });

        }
    }

    #setupRandomlyPositionedRedBalls() {
        this.#redBalls = RedBalls.random({ playFieldDimensions: this.#playFieldDimensions, ballRadius: this.#ballRadius });
    }

    #removeFromWorld() {
        this.#colouredBalls.removeFromWorld();
        this.#redBalls.removeFromWorld();
    }
}