class SnookerCollisionDetector {
  #pockets;
  #objectBalls;
  #cueBall;
  #cushions;

  #previousPottedBallKey;
  #cueBallKey;
  #redBallKey;
  #colouredBallKey;

  constructor({
    pockets,
    objectBalls,
    cueBall,
    cushions,
  }) {
    this.#pockets = pockets;
    this.#objectBalls = objectBalls;
    this.#cueBall = cueBall;
    this.#cushions = cushions;

    this.#cueBallKey = 'cueBall';
    this.#redBallKey = 'redBall';
    this.#colouredBallKey = 'colouredBall';


    this.#addCollisionListener();
  }


  #addCollisionListener() {
    Events.on(engine, 'collisionEnd', (event) => {
      event.pairs.forEach((collision) => {
        const bodyA = collision.bodyA;
        const bodyB = collision.bodyB;
        const isPocketCollision = this.#pockets.isBodyACushion(bodyA) || this.#pockets.isBodyACushion(bodyB);

        const cueBallIsBodyA = bodyA == this.#cueBall.body;
        const cueBallIsBodyB = bodyB == this.#cueBall.body;
        const isCueBallCollision = cueBallIsBodyA || cueBallIsBodyB;

        this.#checkCueBallCollision({
          bodyA: bodyA,
          bodyB: bodyB,
          isPocketCollision: isPocketCollision,
          isCueBallCollision: isCueBallCollision,
        });


        this.#checkRedBallCollision({
          bodyA: bodyA,
          bodyB: bodyB,
          isPocketCollision: isPocketCollision,
          isCueBallCollision: isCueBallCollision,
        });

        this.#checkColouredBallCollision({
          bodyA: bodyA,
          bodyB: bodyB,
          isPocketCollision: isPocketCollision,
          isCueBallCollision: isCueBallCollision,
        });
      });
    });
  }

  #checkCueBallCollision({ bodyA, bodyB, isPocketCollision, isCueBallCollision }) {
    if (isCueBallCollision) {
      if (isPocketCollision) {
        this.#previousPottedBallKey = this.#cueBallKey;
        this.#displayMessage('cue-pocket collision!');
        this.#cueBall.pot();
      } else {
        const isCushionColision = this.#cushions.isBodyACushion(bodyA) || this.#cushions.isBodyACushion(bodyB);
        if (isCushionColision) {
          this.#displayMessage('cue-cushion collision!');
        }
      }
    }
  }

  #checkRedBallCollision({ bodyA, bodyB, isPocketCollision, isCueBallCollision }) {
    const bodyAIsARedBall = this.#objectBalls.isBodyARedBall(bodyA);
    const bodyBIsARedBall = this.#objectBalls.isBodyARedBall(bodyB);
    const isRedBallCollision = bodyAIsARedBall || bodyBIsARedBall;
    if (isRedBallCollision) {
      if (isPocketCollision) {
        this.#previousPottedBallKey = this.#redBallKey;
        if (bodyAIsARedBall) {
          this.#objectBalls.onRedBallPotted(bodyA);
        } else if (bodyBIsARedBall) {
          this.#objectBalls.onRedBallPotted(bodyB);
        }
      } else if (isCueBallCollision) {
        this.#displayMessage('cue-red collision!');
      }
    }
  }

  #checkColouredBallCollision({ bodyA, bodyB, isPocketCollision, isCueBallCollision }) {
    const bodyAIsAColouredBall = this.#objectBalls.isBodyAColouredBall(bodyA);
    const bodyBIsAColouredBall = this.#objectBalls.isBodyAColouredBall(bodyB);
    const isColouredBallCollision = bodyAIsAColouredBall || bodyBIsAColouredBall;

    if (isColouredBallCollision) {
      if (isPocketCollision) {
        if (this.#previousPottedBallKey == this.#colouredBallKey) {
          this.#displayMessage('You can\'t pot two consecutives coloured balls!');
        }
        this.#previousPottedBallKey = this.#colouredBallKey;
        if (bodyAIsAColouredBall) {
          this.#objectBalls.onColouredBallPotted(bodyA);
        } else if (bodyBIsAColouredBall) {
          this.#objectBalls.onColouredBallPotted(bodyB);
        }
      } else if (isCueBallCollision) {
        this.#displayMessage('cue-colour collision!');
      }
    }
  }

  #displayMessage(message) {
    console.log(message);
    const htmlElement = createP(message);
    htmlElement.class('red-text');

    setTimeout(() => {
      htmlElement.remove();
    }, 3000);
  }
}
