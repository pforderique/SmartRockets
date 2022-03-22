let population;

function setup() {
  createCanvas(500, 500);
  population = new Population();
  r = new Rocket();
}

function draw() {
  background(0);
  population.run();
}
