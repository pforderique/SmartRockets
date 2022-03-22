let population;
let target;
let lifeCount = 0;
let lifespan = 200;
let generation = 1;
let genPar;
let lifePar;

function setup() {
  createCanvas(500, 500);
  population = new Population();
  target = new Target();
  genPar = createP();
  lifePar = createP();
}

function draw() {
  background(0);
  population.run();
  
  
  target.show();
  lifeCount++;
  
  if(lifeCount === lifespan) {
    generation++;
    lifeCount = 0;
    population.evaluate();
    population.selection();
  }

  genPar.html("Generation: " + generation);
  lifePar.html("Life Count: " + lifeCount);
}
