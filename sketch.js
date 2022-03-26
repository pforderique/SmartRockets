let windowSize = 500;
let population;
let target;
let state;
let obstacles;
let mutationRate;
let prevBestRocket;
let generation;
let lifeCount;
let maxForce;
let currentLifespan;
let obstacleStartX, obstacleStartY;
let bestFitnessSeen;

// DOM elements
let lifespanLabel;
let lifespanSlider;
let mutationSlider;
let statsButton;
let showOneButton;

const states = {
  WELCOME: 0,
  SIMULATION: 1,
  OBSTACLE: 2,
  TARGETMOVE: 3,
};

function setup() {
  currentLifespan = 200;

  // simulation setup
  createCanvas(windowSize, windowSize);
  state = states.SIMULATION;
  obstacles = [];
  mutationRate = 0.01;
  maxForce = 0.5;
  generation = 1;
  lifeCount = 0;
  bestFitnessSeen = 0;
  population = new Population();
  target = new Target();
  prevBestRocket = new Rocket();

  // UI and controls
  setupUIControls();
}

function draw() {
  background(0);

  switch (state) {
    case states.SIMULATION:
      population.update();
      prevBestRocket.update();
      updateSimulation();
      break;

    case states.OBSTACLE:
      drawObstacle(obstacleStartX, obstacleStartY, mouseX, mouseY);
      break;
  }

  // either show the best parent rocket from previous gen, or current population
  showOneButton.checked() ? prevBestRocket.show() : population.show();
  target.show();
  obstacles.forEach((obstacle) => obstacle.show());
  updateCursor(); // shows correct cursor
  mutationRate = mutationSlider.value(); // update mutationRate
  if (statsButton.checked()) showStats();
}

function updateSimulation() {
  // only update these values at the end of every life cycle
  if (lifeCount++ !== currentLifespan) return;

  const lifespanSliderValue = lifespanSlider.value();
  generation++;
  lifeCount = 0;

  // check if lifespan slider was moved
  if (lifespanSliderValue !== currentLifespan) {
    population.setLifespan(lifespanSliderValue);
    currentLifespan = lifespanSliderValue;
  }

  // update best rocket produced
  prevBestRocket = population.prevBestRocket;
  prevBestRocket.resetRocket();

  // genetically create the new population
  population.evaluate();
  population.selection();
}

function mousePressed() {
  // these mouse function are not intended to activate with
  // other DOM element interactions
  if (!mouseInBounds()) return;

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
