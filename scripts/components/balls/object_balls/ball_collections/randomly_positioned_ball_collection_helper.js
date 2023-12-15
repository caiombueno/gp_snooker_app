/** Helper class for getting unique random positions for balls within the snooker playfield. */
class RandomlyPositionedBallCollectionHelper {
    /** 
     * Helper function to generate random positions within the snooker playfield. 
     * 
     * The positions are generated within a tiny safety margin to avoid positioning 
     * objects too close to the pockets.
     * 
     * The function ensures that all generated positions are different from each other.
     */
    static getRandomPositionsWithinPlayfield(numberOfRandomPositions, playFieldDimensions) {
        const randomXRange = RandomlyPositionedBallCollectionHelper.#getRandomXRange(playFieldDimensions.initialX, playFieldDimensions.endX, playFieldDimensions.width);
        const randomYRange = RandomlyPositionedBallCollectionHelper.#getRandomYRange(playFieldDimensions.initialY, playFieldDimensions.endY, playFieldDimensions.height);

        let randomPositions = [];

        while (randomPositions.length < numberOfRandomPositions) {
            const xPos = getRandomInt(randomXRange);
            const yPos = getRandomInt(randomYRange);

            // Check if the generated position is unique
            const isUnique = !randomPositions.some(position => position.x === xPos && position.y === yPos);

            // If unique, add it to the array
            if (isUnique) {
                randomPositions.push({ x: xPos, y: yPos });
            }
        }

        return randomPositions;
    }

    /**
     * Ensures unique positions for balls from the first collection compared to the second collection.
     * 
     * If any ball from the first collection shares the same position with any ball from the second collection,
     * it moves the ball from the first collection to a new random position within the playfield.
     */
    static ensureUniqueBallPositions({
        firstBallCollection,
        secondBallCollection,
        playFieldDimensions,
    }) {
        const firstArrayOfBalls = firstBallCollection.balls;
        const secondArrayOfBalls = secondBallCollection.balls;

        for (let i = 0; i < firstArrayOfBalls.length; i++) {
            for (let j = 0; j < secondArrayOfBalls.length; j++) {
                if (firstArrayOfBalls[i].position.x === secondArrayOfBalls[j].position.x && array1[i].position.y === secondArrayOfBalls[j].position.y) {
                    const newRandomPosition = RandomlyPositionedBallCollectionHelper.#getRandomPositionWithinPlayfield(playFieldDimensions);
                    firstArrayOfBalls[i].moveTo(newRandomPosition.x, newRandomPosition.y);
                }
            }
        }
    }

    /** Generate a random position within the playfield. */
    static #getRandomPositionWithinPlayfield(playFieldDimensions) {
        const randomXRange = RandomlyPositionedBallCollectionHelper.#getRandomXRange(playFieldDimensions.initialX, playFieldDimensions.endX, playFieldDimensions.width);
        const randomYRange = RandomlyPositionedBallCollectionHelper.#getRandomYRange(playFieldDimensions.initialY, playFieldDimensions.endY, playFieldDimensions.height);

        const xPos = getRandomInt(randomXRange);
        const yPos = getRandomInt(randomYRange);

        return { x: xPos, y: yPos };
    }

    /** Returns the X allowed range for generating a random position within the playfield. */
    static #getRandomXRange(initialX, endX, width) {
        const xSafetyThreshold = width * 0.02;
        const randomXRange = { min: initialX + xSafetyThreshold, max: endX - xSafetyThreshold };

        return randomXRange;
    }

    /** Returns the Y allowed range for generating a random position within the playfield. */
    static #getRandomYRange(initialY, endY, height) {
        const ySafetyThreshold = height * 0.04;

        const randomYRange = { min: initialY + ySafetyThreshold, max: endY - ySafetyThreshold };
        return randomYRange;
    }
}