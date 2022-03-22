class DNA {
  constructor(newGenes=undefined) {
    const magnitude = 0.1;

    if(newGenes) {
      this.genes = newGenes;
    } else {
      this.genes = [];
      for (let i = 0; i < lifespan; ++i) {
          this.genes[i] = p5.Vector.random2D();
          this.genes[i].setMag(magnitude);
        }
    }
  }

  crossover(partner) {
    const splitIndex = floor(random(this.genes.length));

    // ~half of this.genes and half of partner genes
    const newGenes = this.genes.map((gene, idx) => {
      return idx > splitIndex ? gene : partner.genes[idx];
    })

    return new DNA(newGenes);
  }
}
