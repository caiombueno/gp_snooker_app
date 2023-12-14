/**
 * The Collision detector for the Snooker game.
 * Detects collisions between balls, cushions, and pockets.
 */
class SnookerCollisionDetector {
  #pockets;
  #objectBalls;
  #cueBall;
  #cushions;

  #previousPottedBallKey;

  constructor({
    pockets,
    objectBalls,
    cueBall,
    cushions,
  }) {
    // initialize private fields
    this.#pockets = pockets;
    this.#objectBalls = objectBalls;
    this.#cueBall = cueBall;
    this.#cushions = cushions;
    this.#addCollisionListener();
  }

  static get #cueBallKey() { return 'cueBall'; }
  static get #redBallKey() { return 'redBall'; }
  static get #colouredBallKey() { return 'colouredBall'; }

  /**
   * Adds a collision event listener to the physics engine.
   * Handles various types of collisions and triggers appropriate actions.
   */
  #addCollisionListener() {
    Events.on(engine, 'collisionEnd', (event) => {
      event.pairs.forEach((collision) => {
        const bodyA = collision.bodyA;
        const bodyB = collision.bodyB;
        const isPocketCollision = this.#pockets.isBodyAPocket(bodyA) || this.#pockets.isBodyAPocket(bodyB);

        const cueBallIsBodyA = bodyA == this.#cueBall.body;
        const cueBallIsBodyB = bodyB == this.#cueBall.body;
        const isCueBallCollision = cueBallIsBodyA || cueBallIsBodyB;

        if (isCueBallCollision) {
          this.#onCueBallCollision({
            bodyA: bodyA,
            bodyB: bodyB,
            isPocketCollision: isPocketCollision,
          });
        }


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

  /** Handle collisions involving the cue ball and a pocket or a cushion.*/
  #onCueBallCollision({ bodyA, bodyB, isPocketCollision }) {
    if (isPocketCollision) {
      this.#previousPottedBallKey = SnookerCollisionDetector.#cueBallKey;
      this.#displayMessage('cue-pocket collision!');
      this.#cueBall.removeFromTable();
    } else {
      const isCushionColision = this.#cushions.isBodyACushion(bodyA) || this.#cushions.isBodyACushion(bodyB);
      if (isCushionColision) {
        this.#displayMessage('cue-cushion collision!');
      }
    }
  }

  /**
   * Checks collisions involving red balls.
   * Triggers actions based on pocket or cue ball collisions.
   */
  #checkRedBallCollision({ bodyA, bodyB, isPocketCollision, isCueBallCollision }) {
    const bodyAIsARedBall = this.#objectBalls.isBodyARedBall(bodyA);
    const bodyBIsARedBall = this.#objectBalls.isBodyARedBall(bodyB);
    const isRedBallCollision = bodyAIsARedBall || bodyBIsARedBall;
    if (isRedBallCollision) {
      if (isPocketCollision) {
        this.#previousPottedBallKey = SnookerCollisionDetector.#redBallKey;
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

  /**
   * Checks collisions involving coloured balls.
   * Triggers actions based on pocket, cue ball, or consecutive coloured ball collisions.
   */
  #checkColouredBallCollision({ bodyA, bodyB, isPocketCollision, isCueBallCollision }) {
    const bodyAIsAColouredBall = this.#objectBalls.isBodyAColouredBall(bodyA);
    const bodyBIsAColouredBall = this.#objectBalls.isBodyAColouredBall(bodyB);
    const isColouredBallCollision = bodyAIsAColouredBall || bodyBIsAColouredBall;

    if (isColouredBallCollision) {
      if (isPocketCollision) {
        if (this.#previousPottedBallKey == SnookerCollisionDetector.#colouredBallKey) {
          this.#displayMessage('You can\'t pot two consecutives coloured balls!');
        }
        this.#previousPottedBallKey = SnookerCollisionDetector.#colouredBallKey;
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

  /** Displays a message in the console and creates a temporary HTML element for visual feedback. */
  #displayMessage(message) {
    console.log(message);
    const htmlElement = createP(message);
    htmlElement.class('red-text');

    setTimeout(() => {
      htmlElement.remove();
    }, 3000);
  }
}
