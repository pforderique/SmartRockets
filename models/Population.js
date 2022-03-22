class Population {
  constructor() {
    this.rockets = [];
    this.popsize = 100;

    for (let i = 0; i < this.popsize; ++i) {
      this.rockets.push(new Rocket());
    }
  }

  run() {
    for (let i = 0; i < this.popsize; ++i) {
      this.rockets[i].update();
      this.rockets[i].show();
    }
  }
}
