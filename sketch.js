let population;
let target;
let obstacles = [];
let lifeCount = 0;
let lifespan = 400;
let generation = 1;
let state;
let obstacleStartX, obstacleStartY;
let genPar;
let lifePar;

const states = {
  WELCOME: 0,
  SIMULATION: 1,
  OBSTACLE: 2,
};

function setup() {
  createCanvas(500, 500);
  population = new Population();
  target = new Target(50,50);
  state = states.SIMULATION;
  genPar = createP();
  lifePar = createP();
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
  obstacles.forEach(obstacle => obstacle.show());
  genPar.html("Generation: " + generation);
  lifePar.html("Life Count: " + lifeCount);
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
  switch (state) {
    case states.SIMULATION:
      state = states.OBSTACLE;
      obstacleStartX = mouseX;
      obstacleStartY = mouseY;
      break;
  }
}

function mouseReleased() {
  switch (state) {
    case states.OBSTACLE:
      state = states.SIMULATION;
      obstacles.push(
        new Obstacle(obstacleStartX, obstacleStartY, mouseX, mouseY));
      print(obstacles)
      break;
  }
}
