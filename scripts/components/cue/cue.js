class Cue {
    constructor(width) {
        const cueDistance = 5;
        this.cueBallRadiusWithDistance = cueBall.circleRadius + cueDistance;
        this.cueStickWidth = width - this.cueBallRadiusWithDistance;
        this.cueTipWidth = 5;
        this.cueHeight = 5;
        this.cueXPos = 0;
        this.cueYPos = - this.cueHeight * 0.5;
    }

    draw(xPos, yPos) {
        push();
        const mouseVector = createVector(mouseX, mouseY);
        const angle = atan2(mouseVector.y - yPos, mouseVector.x - xPos);

        // Calculate orbiting object position
        const cueXPos = xPos + this.cueBallRadiusWithDistance * cos(angle);
        const cueYPos = yPos + this.cueBallRadiusWithDistance * sin(angle);

        translate(cueXPos, cueYPos);
        rotate(angle);

        fill(139, 69, 19);
        rect(this.cueXPos, this.cueYPos, this.cueStickWidth, this.cueHeight);

        fill(0);
        rect(this.cueXPos, this.cueYPos, this.cueTipWidth, this.cueHeight);
        pop();
    }
}