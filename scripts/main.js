// module aliases
const {
  Engine,
  Render,
  World,
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

var cue;

var mouseConstraint;

function setupSnookerTable() {
  const snookerTableWidth = 700;
  const snookerTableHeight = snookerTableWidth / 2;
  const canvasCenterX = width / 2;
  const canvasCenterY = height / 2;
  const snookerTableX = canvasCenterX - snookerTableWidth * 0.5;
  snookerTable = new SnookerTable(snookerTableX, canvasCenterY - snookerTableHeight / 2, snookerTableWidth, snookerTableHeight);
}

function setupCollisionDetection() {
  Events.on(engine, 'collisionStart', (event) => {
    event.pairs.forEach((collision) => {
      if (collision.bodyA === cueBall || collision.bodyB === cueBall) {
        console.log('Collision detected!');
      }
    });
  });
}

function disableGravity() {
  engine.world.gravity.x = 0;
  engine.world.gravity.y = 0;
}

function setUpCueBall() {
  const ballRadius = (snookerTable.width / 36) / 2;
  cueBall = Bodies.circle(300, snookerTable.height + 30, ballRadius, { restitution: 1, friction: 0.0 });
}

function setup() {
  var canvas = createCanvas(1200, 600);

  engine = Engine.create();

  disableGravity()

  // mouse constraint
  var mouse = Mouse.create(canvas.elt);
  mouse.pixelRatio = pixelDensity();
  mouseConstraint = MouseConstraint.create(engine, { mouse: mouse });

  setupSnookerTable();

  setUpCueBall();

  // cue
  cue = new CueController(cueBall);

  World.add(engine.world, [cueBall, mouseConstraint]);

  setupCollisionDetection();
}

function draw() {
  background(0);
  Engine.update(engine);
  snookerTable.draw();

  cue.draw();

  drawVertices(cueBall.vertices);
}