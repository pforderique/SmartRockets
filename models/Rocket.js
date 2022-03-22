class Rocket {
  constructor(dna = undefined) {
    this.pos = createVector(width / 2, height);
    this.vel = createVector();
    this.acc = createVector();
    this.fitness = 0;

    this.dna = dna ? dna : new DNA();
  }

  calculateFitness() {
    let distance = dist(
      this.pos.x,
      this.pos.y,
      target.target.x,
      target.target.y
    );
    this.fitness = 1 / distance;

    return this.fitness;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.applyForce(this.dna.genes[lifeCount]);
    this.count++;

    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  show() {
    const bodyWidth = 5;
    const bodyHeight = 25;
    const tipHeight = 5;

    push();
    noStroke();
    fill(255, 150);
    // translate to make drawing easier
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    rectMode(CENTER);
    rect(0, 0, bodyHeight, bodyWidth); // body
    triangle(
      bodyHeight / 2,
      -bodyWidth / 2,
      bodyHeight / 2,
      bodyWidth / 2,
      bodyHeight / 2 + tipHeight,
      0
    ); // tip
    pop();
  }
}
