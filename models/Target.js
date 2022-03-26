class Target {
  constructor(x = width / 2, y = 50) {
    this.target = createVector(x, y);
    this.radius = 16;
  }

  show() {
    push();
    fill(50, 100, 210);
    ellipse(this.target.x, this.target.y, this.radius, this.radius);
    pop();
  }
}
