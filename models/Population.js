class Population {
  constructor() {
    const popsize = 200;
    this.rockets = [];
    this.matingpool = [];

    for (let i = 0; i < popsize; ++i) {
      this.rockets.push(new Rocket());
    }
  }

  // evaluates the fitness of each memeber
  evaluate() {
    // 1. calculate the fitness of every member in the population and normalize
    let maximumFitness = 0;
    this.rockets.forEach((rocket) => {
      maximumFitness = Math.max(maximumFitness, rocket.calculateFitness());
    });

    maximumFitness > 0
      ? this.rockets.forEach((rocket) => (rocket.fitness /= maximumFitness))
      : 0;
    bestFitnessSeen = max(bestFitnessSeen, maximumFitness);
    print(`Generation ${generation} max fitness: ${roundDec(maximumFitness, 5)}`);
  }

  // create the mating pool based on rocket fitness' and create new population
  // based on mating
  selection() {
    // establish the mating pool
    this.matingpool = [];
    this.rockets.forEach((rocket) => {
      for (let i = 0; i < rocket.fitness * 100; ++i) {
        this.matingpool.push(rocket);
      }
    });

    // mating algorithm
    this.rockets = this.rockets.map((_) => {
      const parentA = randChoice(this.matingpool).dna;
      const parentB = randChoice(this.matingpool).dna;
      const childDNA = parentA.crossover(parentB);

      // go through genes of DNA and randomly mutate
      childDNA.mutation();

      return new Rocket(childDNA);
    });
  }

  setLifespan(newLifespan) {
    this.rockets.forEach((rocket) => rocket.dna.setLifespan(newLifespan));
  }

  update() {
    this.rockets.forEach((rocket) => rocket.update());
  }

  show() {
    this.rockets.forEach((rocket) => rocket.show());
  }
}
