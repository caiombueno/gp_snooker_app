/** The pockets for a Snooker table. */
class TablePockets {
    #pockets;
    #pocketRadius;

    constructor(xPos, yPos, tableWidth, tableHeight, pocketDiameter) {
        this.#pocketRadius = pocketDiameter / 2;

        // calculate positions for each pocket
        const leftPocketXPos = xPos + this.#pocketRadius;
        const rightPocketXPos = xPos + tableWidth - this.#pocketRadius;
        const middlePocketXPos = xPos + tableWidth / 2;
        const topPocketYPos = yPos + this.#pocketRadius;
        const bottomPocketYPos = yPos + tableHeight - this.#pocketRadius;

        // create the pockets and initialize the array
        const topLeftPocket = this.#createNewPocket(leftPocketXPos, topPocketYPos);
        const topRightPocket = this.#createNewPocket(rightPocketXPos, topPocketYPos);
        const bottomRightPocket = this.#createNewPocket(rightPocketXPos, bottomPocketYPos);
        const bottomLeftPocket = this.#createNewPocket(leftPocketXPos, bottomPocketYPos);
        const topMiddlePocket = this.#createNewPocket(middlePocketXPos, topPocketYPos);
        const bottomMiddlePocket = this.#createNewPocket(middlePocketXPos, bottomPocketYPos);

        this.#pockets = [topLeftPocket, topRightPocket, bottomRightPocket, bottomLeftPocket, topMiddlePocket, bottomMiddlePocket];
    }

    /** Creates a new pocket with the given parameters. */
    #createNewPocket(x, y) {
        return new Pocket(x, y, this.#pocketRadius);
    }

    /** Check if a given body is one of the pocket. */
    isBodyAPocket(body) {
        for (let i = 0; i < this.#pockets.length; i++) {
            if (this.#pockets[i].isBodyPocket(body)) {
                console.log(true);
                return true;
            }
        }
        return false;
    }

    /** Draw the pockets on the canvas. */
    draw() {
        push();
        fill(0);
        for (let i = 0; i < this.#pockets.length; i++) {
            this.#pockets[i].draw();
        }
        pop();
    }

}