class Population {
  constructor() {
    this.rockets = [];
    this.matingpool = [];
    this.popsize = 50;

    for (let i = 0; i < this.popsize; ++i) {
      this.rockets.push(new Rocket());
    }
  }

  evaluate() {
    // 1. calculate the fitness of every member in the population and normalize
    let maximumFitness = 0
    this.rockets.forEach(rocket => {
        maximumFitness = Math.max(maximumFitness, rocket.calculateFitness())
    })

    maximumFitness > 0
    ? this.rockets.forEach((rocket) => (rocket.fitness /= maximumFitness))
    : 0;
    print("MAX FITNESS: " + roundDec(maximumFitness, 5));

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

      // go through genes of DNA and randomly mutate
      childDNA.mutation();

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
