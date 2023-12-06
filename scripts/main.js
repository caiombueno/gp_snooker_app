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
} = Matter;

var engine;

var table;

var pocket;

function setup() {
  createCanvas(1200, 600);
  background(0);
  // create an engine
  engine = Engine.create();

  table = new SnookerTable(100, 60, 700, engine.world);

  // World.add(engine.world, table.pockets);
}

function draw() {
  Engine.update(engine);
  table.draw();
}