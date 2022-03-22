class Target {
  constructor(x = width / 2, y = 50) {
    this.target = createVector(x, y);
  }

  show() {
    const size = 16;
    ellipse(this.target.x, this.target.y, size, size);
  }
}
