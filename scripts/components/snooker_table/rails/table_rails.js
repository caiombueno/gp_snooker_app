class TableRails {
    #rails;
    #railThickness;
    constructor({ tableXPos, tableYPos, tableWidth, tableHeight, pocketDiameter, railThickness }) {
        this.#railThickness = railThickness;
        this.#rails = [];
        const horizontalRails = this.#createHorizontalRails({
            tableXPos: tableXPos,
            tableYPos: tableYPos,
            tableWidth: tableWidth,
            tableHeight: tableHeight,
            pocketDiameter: pocketDiameter,
        });

        const verticalRails = this.#createVerticalRails({
            tableXPos: tableXPos,
            tableYPos: tableYPos,
            tableWidth: tableWidth,
            tableHeight: tableHeight,
            pocketDiameter: pocketDiameter,
        });

        this.#rails.push(...horizontalRails, ...verticalRails);

        World.add(engine.world, this.#rails);
    }

    #createHorizontalRails({ tableXPos, tableYPos, tableWidth, tableHeight, pocketDiameter }) {
        const leftXPos = tableXPos + (tableWidth * 0.25) + (pocketDiameter * 0.25);
        const rightXPos = tableXPos + (tableWidth * 0.75) - (pocketDiameter * 0.25);
        const topYPos = tableYPos;
        const bottomYPos = tableYPos + tableHeight;
        const railWidth = (tableWidth / 2) - (pocketDiameter * 1.5);

        // rails' bodies
        const topLeftRail = this.#createNewRail({
            x: leftXPos,
            y: topYPos,
            width: railWidth,
            angle: PI,
        });

        const topRightRail = this.#createNewRail({
            x: rightXPos,
            y: topYPos,
            width: railWidth,
            angle: PI,
        });

        const bottomLeftRail = this.#createNewRail({
            x: leftXPos,
            y: bottomYPos,
            width: railWidth,
        });

        const bottomRightRail = this.#createNewRail({
            x: rightXPos,
            y: bottomYPos,
            width: railWidth,
        });

        return [topLeftRail, topRightRail, bottomLeftRail, bottomRightRail];
    }

    #createVerticalRails({ tableXPos, tableYPos, tableWidth, tableHeight, pocketDiameter }) {
        const yPos = tableYPos + (tableHeight / 2);
        const width = tableHeight - (2 * pocketDiameter);

        const leftRail = this.#createNewRail({
            x: tableXPos,
            y: yPos,
            width: width,
            angle: HALF_PI,
        });

        const rightRail = this.#createNewRail({
            x: tableXPos + tableWidth,
            y: yPos,
            width: width,
            angle: HALF_PI,
        });

        return [leftRail, rightRail];
    }

    #createNewRail({
        x,
        y,
        width,
        angle = 0,
    }) {
        return new Rail({
            xPos: x,
            yPos: y,
            width: width,
            height: this.#railThickness,
            angle: angle,
        });
    }

    draw() {
        for (let i = 0; i < this.#rails.length; i++) {
            this.#rails[i].draw();
        }
    }
}