/**
The components on the physical (matter.js) level are the cushions, pockets, and the balls. All the other visible components are only rendered with no physics engine.

How does cue ball striking works

The cue ball striking functionality operates as follows: when the mouse is clicked, a force is applied in the opposite direction of the mouse, and the force intensity 
is determined by the distance of the mouse from the cue ball. However, for this to work, the mouse needs to be within the 'striking area' of the ball. 
The size of this area is determined by the cue controller, and all this implementation is handled by the CueController class.


How does the ball potting works

The SnookerCollisionDetector manages collisions among balls, cushions, and pockets. 
Functionalities for potted balls are overseen by a PocketCollisionHandler instance within the detector. 
Three ball types in snooker each adhere to specific rules when they fall into a pocket.


How does the position mode switching works

The application includes three HTML radio buttons for switching the position mode of the object balls. 
The entity responsible for monitoring these buttons is the PositionModeController. Whenever the form alters its value, the position mode controller calls 
a function (passed as a parameter during class instantiation), passing the checked radio button value to it. 
Additionally, it allows the association of keys with these buttons, enabling the form value to be changed using the keyboard as well.

In our case, when the form's value changes, it removes the cue ball from the table and invokes the Object Ball's changeMode function. 
This function is responsible for modifying the positioning mode of the object balls.

For each type of ball collection (reds and coloured), we have two classes: one for creating the balls at standard positions and another for creating them at random positions.

When changeMode is called, the code checks the passed position mode and reinstantiates new coloured and red balls with the correct position settings.

How does the ball's random positioning works
For the 'random reds only' and 'random reds and coloured' modes, a function checks all ball positions. 
If two or more balls share the same position, one of the balls remains at the same position, while new unique positions are chosen for the other balls 
that previously occupied that position.

The random algorithm selected to generate random numbers within the table range is the random function from P5.js.


Extension

One of the tutors for this module, Pedram, mentioned during a webinar on December 15, 2023, that implementing a good object-oriented (OO) structure 
and utilizing ES6 syntax in our project could be considered an extension, as it requires knowledge beyond the module that I had to learn myself.

Following these guidelines, I've developed this project, incorporating techniques such as OOP, defensive programming, code reusability, 
and modularity as best as I could. The goal was to create code that can be easily read by anyone and structured in a way that new features can be added seamlessly.
 */





// module aliases
const {
  Engine,
  Render,
  World,
  Composite,
  Body,
  Bodies,
  Mouse,
  MouseConstraint,
  Constraint,
  Events,
  Vector,
} = Matter;

var engine;

var snookerTable;

var cueBall;

var objectBalls;

var mouseConstraint;

var positionModeController;

const startingPositionsRadioId = 'starting_positions';
const randomRedsOnlyRadioId = 'random_reds_only';
const randomRedsAndColouredRadioId = 'random_reds_and_coloured';

function setup() {
  const canvas = createCanvas(1200, 600);

  engine = Engine.create();

  disableGravity();

  // mouse constraint
  var mouse = Mouse.create(canvas.elt);
  mouse.pixelRatio = pixelDensity();
  mouseConstraint = MouseConstraint.create(engine, { mouse: mouse });

  setupSnookerTable();

  setupBalls();

  setupPositionModeController();

  // initialize a collision detector with relevant game components
  const collisionDetector = new SnookerCollisionDetector({
    pockets: snookerTable.pockets,
    objectBalls: objectBalls,
    cueBall: cueBall,
    cushions: snookerTable.cushions,
  });
  collisionDetector.addCollisionListener();

  World.add(engine.world, [mouseConstraint]);
}

function draw() {
  background(0);
  Engine.update(engine);
  snookerTable.draw();
  cueBall.draw();
  objectBalls.draw();
}

function setupSnookerTable() {
  // define the width and height of the snooker table
  const snookerTableWidth = 500;
  const snookerTableHeight = snookerTableWidth / 2;

  // calculate the center coordinates of the canvas
  const canvasCenterX = width / 2;
  const canvasCenterY = height / 2;

  // calculate the starting position of the snooker table to center it on the canvas
  const snookerTableX = canvasCenterX - snookerTableWidth * 0.5;
  const snookerTableY = canvasCenterY - snookerTableHeight * 0.5;

  // create snooker table
  snookerTable = new SnookerTable(snookerTableX, snookerTableY, snookerTableWidth, snookerTableHeight);
}

function disableGravity() {
  engine.world.gravity.x = 0;
  engine.world.gravity.y = 0;
}

function setupBalls() {
  // calculate the ball radius based on the snooker table width
  const ballRadius = snookerTable.width / 72 * 0.5;

  // create a new CueBall instance with the calculated ball radius
  cueBall = new CueBall(ballRadius);

  // create new object balls with the specified parameters
  objectBalls = new ObjectBalls({
    playFieldDimensions: snookerTable.playFieldDimensions,
    arcProperties: snookerTable.baulk.arcProperties,
    ballRadius: ballRadius,
    startingPositionsModeId: startingPositionsRadioId,
    randomRedsOnlyModeId: randomRedsOnlyRadioId,
    randomRedsAndColouredModeId: randomRedsAndColouredRadioId,
  });
}



function setupPositionModeController() {
  // changes the position mode for a set of balls based on the provided positionMode
  const onChangePositionMode = function (positionMode) {
    // remove the cue ball from the table
    cueBall.removeFromTable();
    // change the position mode of the object balls
    objectBalls.changeMode(positionMode);
  };
  positionModeController = new PositionModeController({
    formId: 'balls_position_form',
    startingPositionsRadioId: startingPositionsRadioId,
    startingPositionsRadioKey: 'z',
    randomRedsOnlyRadioId: randomRedsOnlyRadioId,
    randomRedsOnlyRadioKey: 'x',
    randomRedsAndColouredRadioId: randomRedsAndColouredRadioId,
    randomRedsAndColouredRadioKey: 'c',
    onChangePositionMode: onChangePositionMode,
  });
}



function mousePressed() {
  // check if the cue ball is out of the table
  if (cueBall.isOutOfTable) {
    // if the mouse is within the play field dimensions, place the cue ball on the table
    if (snookerTable.baulk.isObjectWithinArc({ x: mouseX, y: mouseY })) {
      cueBall.placeOnTable();
    } else {
      displayMessage('The cue ball can only be placed within the baulk arc!');
    }
  }
}

function keyPressed() {
  positionModeController.onKeyPressed(key);
}