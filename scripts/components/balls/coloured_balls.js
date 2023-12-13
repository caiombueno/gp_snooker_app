class ColouredBalls {

    static standard({ ballRadius, arcMiddlePositionXPos, arcRadius, tableMiddlePosition, tableWidth }) {
        return new StandardPositionedColouredBalls({
            ballRadius: ballRadius,
            arcMiddlePositionXPos: arcMiddlePositionXPos,
            arcRadius: arcRadius,
            tableMiddlePosition: tableMiddlePosition,
            tableWidth: tableWidth,
        });
    }

    static random({ playFieldDimensions, ballRadius }) {
        return new RandomlyPositionedColouredBalls({
            playFieldDimensions: playFieldDimensions,
            ballRadius: ballRadius,
        });
    }

    isBodyAColouredBall(body) {
        return this._balls.some(ball => ball.body === body);
    }

    onBallPotted(body) {
        const ball = this._balls.find(ball => ball.body === body);
        if (ball != null) {
            const body = ball.body;
            Body.setVelocity(body, { x: 0, y: 0 });
            Body.setSpeed(body, 0);
            Body.setAngularSpeed(body, 0);

            Body.setPosition(body, ball.initialPosition);
            console.log(body.speed);
            console.log(body.velocity.y);
            // Matter.Sleeping.set(body, false);
        }
    }

    removeFromWorld() {
        let bodies = [];

        for (let i = 0; i < this._balls.length; i++) {
            const body = this._balls[i].body;
            bodies.push(body);
        }

        World.remove(engine.world, bodies);
    }

    draw() {
        for (let i = 0; i < this._balls.length; i++) {
            this._balls[i].draw();

        }
    }
}

class StandardPositionedColouredBalls extends ColouredBalls {
    constructor({ ballRadius, arcMiddlePositionXPos, arcRadius, tableMiddlePosition, tableWidth }) {
        super();

        const greenBall = new Ball(arcMiddlePositionXPos, tableMiddlePosition.y - arcRadius, ballRadius, color(0, 255, 0), true);

        const yellowBall = new Ball(arcMiddlePositionXPos, tableMiddlePosition.y + arcRadius, ballRadius, color(255, 255, 0), true);

        const orangeBall = new Ball(arcMiddlePositionXPos, tableMiddlePosition.y, ballRadius, color(255, 165, 0), true);

        const blueBall = new Ball(tableMiddlePosition.x, tableMiddlePosition.y, ballRadius, color(0, 0, 255), true);

        const pinkBall = new Ball(tableMiddlePosition.x + tableWidth * 0.25, tableMiddlePosition.y, ballRadius, color(255, 192, 203), true);

        const blackBall = new Ball(tableMiddlePosition.x + tableWidth * 0.4, tableMiddlePosition.y, ballRadius, color(0), true);

        this._balls = [greenBall, yellowBall, orangeBall, blueBall, pinkBall, blackBall];
    }
}

class RandomlyPositionedColouredBalls extends ColouredBalls {
    constructor({ playFieldDimensions, ballRadius }) {
        super();
        const randomXRange = { min: playFieldDimensions.initialX, max: playFieldDimensions.endX };
        const randomYRange = { min: playFieldDimensions.initialY, max: playFieldDimensions.endY };

        const greenBall = new Ball(getRandomInt(randomXRange), getRandomInt(randomYRange), ballRadius, color(0, 255, 0), true);

        const yellowBall = new Ball(getRandomInt(randomXRange), getRandomInt(randomYRange), ballRadius, color(255, 255, 0), true);

        const orangeBall = new Ball(getRandomInt(randomXRange), getRandomInt(randomYRange), ballRadius, color(255, 165, 0), true);

        const blueBall = new Ball(getRandomInt(randomXRange), getRandomInt(randomYRange), ballRadius, color(0, 0, 255), true);

        const pinkBall = new Ball(getRandomInt(randomXRange), getRandomInt(randomYRange), ballRadius, color(255, 192, 203), true);

        const blackBall = new Ball(getRandomInt(randomXRange), getRandomInt(randomYRange), ballRadius, color(0), true);

        this._balls = [greenBall, yellowBall, orangeBall, blueBall, pinkBall, blackBall];
    }
}