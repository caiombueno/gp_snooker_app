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
  new SnookerCollisionDetector({
    pockets: snookerTable.pockets,
    objectBalls: objectBalls,
    cueBall: cueBall,
    cushions: snookerTable.cushions,
  });

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
  const snookerTableWidth = 1000;
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
    arcProperties: snookerTable.baulkArcProperties,
    ballRadius: ballRadius,
    startingPositionsId: startingPositionsRadioId,
    randomRedsOnlyId: randomRedsOnlyRadioId,
    randomRedsAndColouredId: randomRedsAndColouredRadioId,
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
    const playFieldDimensions = snookerTable.playFieldDimensions;

    // check if the mouse is within the X and Y play field range
    const mouseIsWithinXPlayFieldRange = (mouseX >= playFieldDimensions.initialX && mouseX <= playFieldDimensions.endX);
    const mouseIsWithinYPlayFieldRange = (mouseY >= playFieldDimensions.initialY && mouseY <= playFieldDimensions.endY);

    // check if the mouse is within the overall play field dimensions
    const mouseIsWithinPlayFieldDimensions = mouseIsWithinXPlayFieldRange && mouseIsWithinYPlayFieldRange;

    // if the mouse is within the play field dimensions, place the cue ball on the table
    if (mouseIsWithinPlayFieldDimensions) {
      cueBall.placeOnTable();
    }
  }
}

function keyPressed() {
  positionModeController.onKeyPressed(key);
}