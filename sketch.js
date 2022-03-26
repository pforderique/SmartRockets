let population;
let target;
let state;
let obstacles;
let mutationRate;
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

const states = {
  WELCOME: 0,
  SIMULATION: 1,
  OBSTACLE: 2,
  TARGETMOVE: 3,
};

function setup() {
  const windowSize = 500;
  const minMutationRate = 0;
  const maxMutationRate = 0.1;
  const minLifespan = 100;
  const maxLifespan = 800;
  currentLifespan = 200;

  // simulation setup
  createCanvas(windowSize, windowSize);
  state = states.SIMULATION;
  obstacles = [];
  mutationRate = 0.01;
  maxForce = 0.15;
  generation = 1;
  lifeCount = 0;
  bestFitnessSeen = 0
  population = new Population();
  target = new Target();
  
  // UI and controls
  const lifespanLabel = createDiv(`Lifespan (${minLifespan}-${maxLifespan})`).style('display', 'flex').style('align-items', 'center');
  lifespanSlider = createSlider(minLifespan, maxLifespan, currentLifespan, 50).style('width', `${windowSize/4}px`).parent(lifespanLabel);

  const mutationLabel = createDiv(`Mutation Rate`);
  mutationSlider = createSlider(minMutationRate, maxMutationRate, mutationRate, 0.005).style('width', `${windowSize/10}px`).parent(mutationLabel);

  const buttonDiv = createDiv('');
  buttonDiv.style('display', 'flex').style('justify-content', 'space-around');
  statsButton = createCheckbox('show stats', true);
  statsButton.parent(buttonDiv);
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
  mutationRate = mutationSlider.value(); // update mutationRate
  if (statsButton.checked()) showStats();
}

function updateSimulation() {
  // if (lifeCount++ !== lifespan) return;
  if (lifeCount++ !== currentLifespan) return;

  const lifespanSliderValue = lifespanSlider.value();
  generation++;
  lifeCount = 0;

  // check if lifespan slider was moved
  if (lifespanSliderValue !== currentLifespan) {
    population.setLifespan(lifespanSliderValue);
    currentLifespan = lifespanSliderValue;
  }

  // genetically create the new population
  population.evaluate();
  population.selection();
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
