class Rocket {
  constructor(dna = undefined) {
    // init physics
    this.pos = createVector(width / 2, height - 1);
    this.vel = createVector();
    this.acc = createVector();

    // init genetic & simulation information
    this.dna = dna ? dna : new DNA();
    this.fitness = 0;
    this.crashed = false;
    this.succeeded = false;
    this.successTimer = undefined;

    // init physical features
    this.bodyWidth = 5;
    this.bodyHeight = 25;
    this.tipHeight = 5;
    this.updateHitLine();
  }

  calculateFitness() {
    const crashPenalty = 0.05; // reduce 95% of fitness
    const successGain = 2; // double fitness of those who reached

    // normally, fitness = inverse of distance to target
    const distance = this.distanceToTarget();
    this.fitness = distance === 0 ? Number.MAX_SAFE_INTEGER : 1 / distance;

    // plus a time metric
    if (this.succeeded) this.fitness += 1 / this.successTimer;

    // reduce the fitness of rockets that have crashed!
    if (this.crashed) this.fitness *= crashPenalty;

    // but if we reached target, scale up
    if (this.succeeded) this.fitness *= successGain;

    return this.fitness;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    const reachedThreshold = 6;

    // check if previously succeeded or crashed
    if (this.succeeded || this.crashed) return;

    // check if rocket reached target for the first time
    if (this.succeeded || this.distanceToTarget() < reachedThreshold) {
      this.succeeded = true;
      this.successTimer = lifeCount; // record the amount of time it takes to get there
      return;
    }
    // check if rocket crashed for the first time
    if (this.crashed || this.checkCollision()) {
      this.crashed = true;
      return;
    }

    // update movement
    this.applyForce(this.dna.genes[lifeCount]);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    this.updateHitLine();
  }

  updateHitLine() {
    // make titled my guy
    const angle = this.vel.heading();
    const p1Rotated = rotatePoint(
      { x: this.pos.x - this.bodyHeight / 2, y: this.pos.y },
      this.pos,
      angle
    );
    const p2Rotated = rotatePoint(
      { x: this.pos.x + this.bodyHeight / 2, y: this.pos.y },
      this.pos,
      angle
    );
    this.bodyCrossSegment = {
      x1: p1Rotated.x,
      y1: p1Rotated.y,
      x2: p2Rotated.x,
      y2: p2Rotated.y,
    };
  }

  show() {
    push();
    noStroke();
    // color red if crashed, else white
    this.crashed ? fill(220, 20, 0, 150) : fill(255, 150);
    // color green if reached target
    this.succeeded ? fill(20, 220, 0, 150) : 0;
    // translate to make drawing easier
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    rectMode(CENTER);
    rect(0, 0, this.bodyHeight, this.bodyWidth); // body
    triangle(
      this.bodyHeight / 2,
      -this.bodyWidth / 2,
      this.bodyHeight / 2,
      this.bodyWidth / 2,
      this.bodyHeight / 2 + this.tipHeight,
      0
    ); // tip
    pop();

    push();
    stroke(0, 10, 220, 150);
    strokeWeight(3);
    // line(this.bodyCrossSegment.x1, this.bodyCrossSegment.y1, this.bodyCrossSegment.x2, this.bodyCrossSegment.y2);
    pop();
  }

  checkCollision() {
    let collidesWithObstacle = false;
    obstacles.forEach((obstacle) => {
      // get each cross side of this rocket
      // defined as line segment from top right to bottom left
      if (lineSegmentsIntersect(obstacle, this.bodyCrossSegment)) {
        collidesWithObstacle = true;
      }
    });

    // check wall collision
    return (
      collidesWithObstacle ||
      this.pos.x <= 0 ||
      this.pos.x >= width ||
      this.pos.y <= 0 ||
      this.pos.y >= height
    );
  }

  distanceToTarget() {
    return dist(this.pos.x, this.pos.y, target.target.x, target.target.y);
  }
}
