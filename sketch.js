let population;
let target;
let obstacles = [];
let lifeCount = 0;
let lifespan = 300;
let generation = 1;
let maxForce = 0.15;
let statsButton;
let state;
let obstacleStartX, obstacleStartY;
let bestFitnessSeen = 0;

const states = {
  WELCOME: 0,
  SIMULATION: 1,
  OBSTACLE: 2,
  TARGETMOVE: 3,
};

function setup() {
  createCanvas(500, 500);
  population = new Population();
  target = new Target();
  state = states.SIMULATION;
  statsButton = createCheckbox('show stats', true);
}

function draw() {
  background(0);

  switch (state) {
    case states.SIMULATION:
      population.update();
      updateSimulation();
      break;

    case states.OBSTACLE:
      drawObstacle(obstacleStartX, obstacleStartY, mouseX, mouseY);
      break;
  }

  population.show();
  target.show();
  obstacles.forEach((obstacle) => obstacle.show());
  updateCursor(); // shows correct cursor
  if (statsButton.checked()) showStats();
}

function updateSimulation() {
  if (lifeCount++ === lifespan) {
    generation++;
    lifeCount = 0;
    population.evaluate();
    population.selection();
  }
}

function mousePressed() {
  // these mouse function are not intended to activate with
  // other DOM element interactions
  if(!mouseInBounds()) return;

  switch (state) {
    case states.SIMULATION:
      if (mouseOverTarget()) {
        state = states.TARGETMOVE;
        return;
      }
      state = states.OBSTACLE;
      obstacleStartX = mouseX;
      obstacleStartY = mouseY;
      break;
  }
}

function mouseDragged() {
  switch (state) {
    case states.TARGETMOVE:
      // target follows mouse but does nto go beyond border
      target.target = createVector(
        max(0, min(mouseX, width)),
        max(0, min(mouseY, height))
      );
      break;
  }
}

function mouseReleased() {
  switch (state) {
    // create a new obstacle in simulation
    case states.OBSTACLE:
      state = states.SIMULATION;
      obstacles.push(
        new Obstacle(obstacleStartX, obstacleStartY, mouseX, mouseY)
      );
      break;

    // finalize target location
    case states.TARGETMOVE:
      state = states.SIMULATION;
      break;
  }
}
