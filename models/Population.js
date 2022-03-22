class Population {
  constructor() {
    this.rockets = [];
    this.matingpool = [];
    this.popsize = 100;

    for (let i = 0; i < this.popsize; ++i) {
      this.rockets.push(new Rocket());
    }
  }

  evaluate() {
    // 1. calculate the fitness of every member in the population and normalize
    const maxFit = this.rockets.reduce((maxFitness, rocket) =>
      max(maxFitness, rocket.calculateFitness())
    );
    maxFit > 0
      ? this.rockets.forEach((rocket) => (rocket.fitness /= maxFit))
      : 0;

    // 2. establish the mating pool
    this.matingpool = [];
    this.rockets.forEach((rocket) => {
      for (let i = 0; i < rocket.fitness * 100; ++i) {
        this.matingpool.push(rocket);
      }
    });
  }

  selection() {
    this.rockets = this.rockets.map((_) => {
      const parentA = randChoice(this.matingpool).dna;
      const parentB = randChoice(this.matingpool).dna;
      const childDNA = parentA.crossover(parentB);

      return new Rocket(childDNA);
    });
  }

  run() {
    for (let i = 0; i < this.popsize; ++i) {
      this.rockets[i].update();
      this.rockets[i].show();
    }
  }
}
