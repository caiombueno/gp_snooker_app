class RedBalls {
    constructor() {
        this._balls = [];
    }

    static standard({ xPos, yPos, ballRadius }) {
        return new StandardPositionedRedBalls({
            xPos: xPos,
            yPos: yPos,
            ballRadius: ballRadius
        });
    }

    static random({ playFieldDimensions, ballRadius }) {
        return new RandomlyPositionedRedBalls({
            playFieldDimensions: playFieldDimensions,
            ballRadius: ballRadius,
        });
    }

    isBodyARedBall(body) {
        return this._balls.some(ball => ball.body === body);
    }

    onBallPotted(body) {
        const ball = this._balls.find(ball => ball.body === body);
        if (ball != null) {
            this._balls = this._balls.filter(element => element !== ball);
            World.remove(engine.world, ball.body);
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

class StandardPositionedRedBalls extends RedBalls {
    constructor({ xPos, yPos, ballRadius }) {
        super();
        const numRows = 5;
        const spacing = 15;

        for (let i = 1; i <= numRows; i++) {
            const yOffset = (yPos - i * spacing / 2) + ballRadius;

            for (let j = 0; j < i; j++) {
                const x = xPos + i * spacing;
                const y = yOffset + j * spacing;
                const redBall = new Ball(x, y, ballRadius, color(255, 0, 0));
                this._balls.push(redBall);
            }
        }
    }
}

class RandomlyPositionedRedBalls extends RedBalls {
    constructor({ playFieldDimensions, ballRadius }) {
        super();
        const randomXRange = { min: playFieldDimensions.initialX, max: playFieldDimensions.endX };
        const randomYRange = { min: playFieldDimensions.initialY, max: playFieldDimensions.endY };

        for (let i = 0; i < 15; i++) {
            const redBall = new Ball(getRandomInt(randomXRange), getRandomInt(randomYRange), ballRadius, color(255, 0, 0));
            this._balls.push(redBall);
        }
    }
}