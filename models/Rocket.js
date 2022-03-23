class Rocket {
  constructor(dna = undefined) {
    this.pos = createVector(width / 2, height - 1);
    this.vel = createVector();
    this.acc = createVector();

    this.dna = dna ? dna : new DNA();
    this.fitness = 0;
    this.completed = false;
    this.crashed = false;
  }

  calculateFitness() {
    const distance = this.distanceToTarget();
    this.fitness = distance === 0 ? Number.MAX_SAFE_INTEGER : 1 / distance;
    return this.fitness;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    const reachedThreshold = 6;

    // check if rocket reached target
    if (this.completed || this.distanceToTarget() < reachedThreshold) {
      this.completed = true;
      // this.pos = target.target.copy();
      return;

    }
    // check if rocket crashed
    if(this.crashed || this.checkCollision()) {
      this.crashed = true;
      return;
    }

    // update movement
    this.applyForce(this.dna.genes[lifeCount]);
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
    // color red if crashed, else white
    this.crashed ? fill(220, 20, 0, 150) : fill(255, 150);
    // color green if reached target
    this.completed ? fill(20, 220, 0, 150) : 0;
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

  checkCollision(obstacle = undefined) {
    if(obstacle) {
      //TODO check rocket collision with this obstacle
    }

    // check wall collision
    return (this.pos.x <= 0 || this.pos.y >= width
            || this.pos.y <= 0 || this.pos.y >= height);
  }

  distanceToTarget() {
    return dist(this.pos.x, this.pos.y, target.target.x, target.target.y);
  }
}
