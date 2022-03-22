let population;
let lifeCount = 0;
let lifespan = 200;
let lifePar;

function setup() {
  createCanvas(500, 500);
  population = new Population();
  lifePar = createP();
}

function draw() {
  background(0);
  population.run();
  lifePar.html("Life Count: " + lifeCount);

  lifeCount++;
}
