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

var ballRadius;

var objectBalls;

var cue;

var mouseConstraint;

function setupSnookerTable() {
  const snookerTableWidth = 1000;
  const snookerTableHeight = snookerTableWidth / 2;
  const canvasCenterX = width / 2;
  const canvasCenterY = height / 2;
  const snookerTableX = canvasCenterX - snookerTableWidth * 0.5;
  snookerTable = new SnookerTable(snookerTableX, canvasCenterY - snookerTableHeight / 2, snookerTableWidth, snookerTableHeight);
}

function disableGravity() {
  engine.world.gravity.x = 0;
  engine.world.gravity.y = 0;
}

function addPositionModeEventListener() {
  const form = document.getElementById('balls_position_form');
  form.addEventListener('change', function () {
    const startingPositionsRadio = document.getElementById('starting_positions');
    const randomRedsOnlyRadio = document.getElementById('random_reds_only');
    const randomRedsAndColouredRadio = document.getElementById('random_reds_and_coloured');

    if (startingPositionsRadio.checked) {
      changePositionMode(startingPositionsRadio.value);
    } else if (randomRedsOnlyRadio.checked) {
      changePositionMode(randomRedsOnlyRadio.value);
    } else if (randomRedsAndColouredRadio.checked) {
      changePositionMode(randomRedsAndColouredRadio.value);
    }
  });
}

function changePositionMode(positionMode) {
  cueBall.removeFromWorld();
  setupCueBall();

  objectBalls.changeMode(positionMode);
}

function setupCueBall() {
  cueBall = new CueBall(
    snookerTable.arcProperties.x - 30,
    snookerTable.arcProperties.y,
    ballRadius,
  );
}

function setupBalls() {
  ballRadius = snookerTable.width / 72 * 0.5;

  setupCueBall();

  objectBalls = new ObjectBalls({
    playFieldDimensions: snookerTable.playFieldDimensions,
    arcProperties: snookerTable.arcProperties,
    ballRadius: ballRadius,
  });
}

function setup() {
  var canvas = createCanvas(1200, 600);

  engine = Engine.create();

  disableGravity();

  addPositionModeEventListener();

  // mouse constraint
  var mouse = Mouse.create(canvas.elt);
  mouse.pixelRatio = pixelDensity();
  mouseConstraint = MouseConstraint.create(engine, { mouse: mouse });

  setupSnookerTable();

  setupBalls();

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

function mousePressed() {
  if (cueBall.isPotted) {
    cueBall.unpot();
  }
}