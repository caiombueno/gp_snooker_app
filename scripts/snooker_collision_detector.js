/**
 * The Collision detector for the Snooker game.
 * Detects collisions between balls, cushions, and pockets.
 */
class SnookerCollisionDetector {
  #pockets;
  #objectBalls;
  #cueBall;
  #cushions;
  #pocketCollisionHandler;

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

    // instantiate a [PocketCollisionHandler] to manage when a ball is potted
    this.#pocketCollisionHandler = new PocketCollisionHandler({
      objectBalls: objectBalls,
      cueBall: cueBall,
    });
  }

  /**
   * Adds a collision event listener to the physics engine.
   * Handles various types of collisions and triggers appropriate actions.
   */
  addCollisionListener() {
    Events.on(engine, 'collisionEnd', (event) => {
      event.pairs.forEach((collision) => {
        const bodyA = collision.bodyA;
        const bodyB = collision.bodyB;

        const isPocketCollision = this.#pockets.isBodyAPocket(bodyA) || this.#pockets.isBodyAPocket(bodyB);
        const isCueBallCollision = bodyA == this.#cueBall.body || bodyB == this.#cueBall;

        const isCushionColision = this.#isCushionCollision(bodyA, bodyB);
        const redBallInCollision = this.#redBallInCollision(bodyA, bodyB);
        const colouredBallInCollision = this.#colouredBallInCollision(bodyA, bodyB);


        // notifies the user when the collision involves the cue ball
        if (isCueBallCollision) {
          if (isCushionColision) {
            displayMessage('cue-cushion collision!');
          } else if (redBallInCollision) {
            displayMessage('cue-red collision!');
          } else if (colouredBallInCollision) {
            displayMessage('cue-colour collision!');
          } else if (isPocketCollision) {
            displayMessage('cue-pocket collision!');
          }
        }

        // handles events when a ball is potted
        if (isPocketCollision) {
          if (isCueBallCollision) {
            this.#pocketCollisionHandler.onCueBallPotted();
          } else if (redBallInCollision) {
            this.#pocketCollisionHandler.onRedBallPotted(redBallInCollision);
          } else if (colouredBallInCollision) {
            this.#pocketCollisionHandler.onColouredBallPotted(colouredBallInCollision);
          }
        }
      });
    });
  }

  /** Checks if the collision involves a cushion.*/
  #isCushionCollision(bodyA, bodyB) {
    const isCushionColision = this.#cushions.isBodyACushion(bodyA) || this.#cushions.isBodyACushion(bodyB);
    if (isCushionColision) {
      return true;
    }
  }

  /** 
   * If a red ball was involved in the collision, return the red ball's body.
   * Else, return null.
   */
  #redBallInCollision(bodyA, bodyB) {
    const bodyAIsARedBall = this.#objectBalls.isBodyARedBall(bodyA);
    if (bodyAIsARedBall) {
      return bodyA;
    }
    const bodyBIsARedBall = this.#objectBalls.isBodyARedBall(bodyB);
    if (bodyBIsARedBall) {
      return bodyB;
    }

    return null;
  }

  /** 
   * If a coloured ball was involved in the collision, return the red ball's body.
   * Else, return null.
   */
  #colouredBallInCollision(bodyA, bodyB) {
    const bodyAIsAColouredBall = this.#objectBalls.isBodyAColouredBall(bodyA);
    if (bodyAIsAColouredBall) {
      return bodyA;
    }
    const bodyBIsAColouredBall = this.#objectBalls.isBodyAColouredBall(bodyB);
    if (bodyBIsAColouredBall) {
      return bodyB;
    }

    return null;
  }
}

/** 
 * Manages actions related to ball potting 
 * and keeps track of the latest potted ball.
 */
class PocketCollisionHandler {
  #objectBalls;
  #cueBall;
  #latestPottedBallKey;

  constructor({
    objectBalls,
    cueBall,
    onDisplayMessage,
  }) {
    this.#objectBalls = objectBalls;
    this.#cueBall = cueBall;
  }

  /**
   * Those keys will be assigned to [#latestPottedBallKey] everytime a ball is potted
   * in order to keep track of the of the type of the latest potted ball.
   */
  static get #cueBallKey() { return 'cueBall'; }
  static get #redBallKey() { return 'redBall'; }
  static get #colouredBallKey() { return 'colouredBall'; }

  /** Handles actions when the cue ball is potted.*/
  onCueBallPotted() {
    // register latest potted ball
    this.#latestPottedBallKey = PocketCollisionHandler.#cueBallKey;
    this.#cueBall.removeFromTable();
  }

  /** Handles actions when a red ball is potted.*/
  onRedBallPotted(body) {
    // register latest potted ball
    this.#latestPottedBallKey = PocketCollisionHandler.#redBallKey;
    this.#objectBalls.onRedBallPotted(body);
  }

  /** Handles actions when a coloured ball is potted.*/
  onColouredBallPotted(body) {
    if (this.#latestPottedBallKey == PocketCollisionHandler.#colouredBallKey) {
      // warn the user if two colored balls were consecutively potted
      displayMessage('You can\'t pot two consecutives coloured balls!');
    }
    // register latest potted ball
    this.#latestPottedBallKey = PocketCollisionHandler.#colouredBallKey;
    this.#objectBalls.onColouredBallPotted(body);
  }
}