let population;
let target;
let lifeCount = 0;
let lifespan = 200;
let generation = 1;
let state;
let mouseDown = false;
let obstacleStartX, obstacleStartY;
let genPar;
let lifePar;

const states = {
	WELCOME: "summer",
	SIMULATION: "winter",
	OBSTACLE: "spring",
}

function setup() {
  createCanvas(500, 500);
  population = new Population();
  target = new Target();
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
      // draw the obstacle
      push();
      stroke(255);
      strokeWeight(1);
      line(obstacleStartX, obstacleStartY, mouseX, mouseY);
      pop();
      break;
  }

  population.show();
  target.show();
  genPar.html("Generation: " + generation);
  lifePar.html("Life Count: " + lifeCount);
}

function updateSimulation() {
  if(lifeCount++ === lifespan) {
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
      break;
  }
}