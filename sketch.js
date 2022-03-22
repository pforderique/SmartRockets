let rocket;

function setup() {
  createCanvas(400, 400);
  rocket = new Rocket();
}

function draw() {
  background(220);
  rocket.update();
  rocket.show();
}
