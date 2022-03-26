class DNA {
  constructor(newGenes = undefined) {
    this.mutationRate = 0.01;

    if (newGenes) {
      this.genes = newGenes;
    } else {
      this.genes = [];
      for (let i = 0; i < currentLifespan; ++i) {
        this.genes[i] = p5.Vector.random2D();
        // this.genes[i].setMag(maxForce);
        this.genes[i].mult(maxForce);
      }
    }
  }

  crossover(partner) {
    const splitIndex = floor(random(this.genes.length));

    // ~half of this.genes and half of partner genes
    const newGenes = this.genes.map((gene, idx) => {
      return idx > splitIndex ? gene : partner.genes[idx];
    });

    return new DNA(newGenes);
  }

  mutation() {
    this.genes = this.genes.map((gene) => {
      // for each gene in this DNA, decide to set it to a new random vector
      if (random(1) < this.mutationRate) {
        const newGene = p5.Vector.random2D();
        newGene.mult(maxForce);
        return newGene;
      } else {
        return gene;
      }
    });
  }

  // updates the lifespan of the population with integer `lifespan`
  setLifespan(newLifespan) {
    const currentSpan = this.genes.length;

    // slice the genes to shorter copy
    if (newLifespan < currentSpan) {
      this.genes = this.genes.slice(0, newLifespan);
      return;
    }
    // or add new random genes
    for (let i = currentSpan; i < newLifespan; ++i) {
      this.genes[i] = p5.Vector.random2D();
      this.genes[i].mult(maxForce);
    }
  }
}
