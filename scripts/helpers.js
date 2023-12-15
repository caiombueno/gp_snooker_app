/** Draws a shape using the given vertices of a body. */
function drawVertices(vertices) {
    beginShape();
    for (var i = 0; i < vertices.length; i++) {
        vertex(vertices[i].x, vertices[i].y);
    }
    endShape(CLOSE);
}

/** Generates a random integer within the specified range. */
function getRandomInt({ min, max }) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(random(min, max));
}

/** Displays a message in the console and creates a temporary HTML element for visual feedback. */
function displayMessage(message) {
    console.log(message);
    const htmlElement = createP(message);
    htmlElement.class('red-text');

    setTimeout(() => {
        htmlElement.remove();
    }, 3000);
}