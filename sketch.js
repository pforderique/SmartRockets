let population;
let target;
let obstacles = [];
let lifeCount = 0;
let generation = 1;
let maxForce = 0.15;
let currentLifespan;
let state;
let obstacleStartX, obstacleStartY;
let bestFitnessSeen = 0;

// DOM elements
let lifespanLabel;
let lifespanSlider;
let statsButton;

const states = {
  WELCOME: 0,
  SIMULATION: 1,
  OBSTACLE: 2,
  TARGETMOVE: 3,
};

function setup() {
  const windowSize = 500;
  const minLifespan = 100;
  const maxLifespan = 800;
  currentLifespan = 200;

  // simulation setup
  createCanvas(windowSize, windowSize);
  population = new Population();
  target = new Target();
  state = states.SIMULATION;
  
  // UI and controls
  const lifespanLabel = createDiv(`Lifespan (${minLifespan}-${maxLifespan})`);
  lifespanLabel.style('display', 'flex').style('align-items', 'center');
  lifespanSlider = createSlider(minLifespan, maxLifespan, currentLifespan, 50);
  lifespanSlider.style('width', `${windowSize/4}px`);
  lifespanSlider.parent(lifespanLabel);

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
