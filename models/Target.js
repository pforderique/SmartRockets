class Target {
  constructor(x = width / 2, y = 50) {
    this.target = createVector(x, y);
    this.radius = 8;
  }

  show() {
    push();
    fill(50, 100, 210);
    ellipse(this.target.x, this.target.y, 2*this.radius, 2*this.radius);
    pop();
  }
}
