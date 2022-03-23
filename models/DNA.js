class DNA {
  constructor(newGenes=undefined) {
    this.geneMagnitude = 0.1;
    this.mutationRate = 0.01;

    if(newGenes) {
      this.genes = newGenes;
    } else {
      this.genes = [];
      for (let i = 0; i < lifespan; ++i) {
          this.genes[i] = p5.Vector.random2D();
          this.genes[i].setMag(this.geneMagnitude);
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

  mutation() {
    this.genes = this.genes.map(gene => {
      // for each gene in this DNA, decide to set it to a new random vector
      if(random(1) < this.mutationRate) {
        const newGene = p5.Vector.random2D();
        newGene.setMag(this.geneMagnitude);
        return newGene;
      } else {
        return gene;
      }
    });
  }
}
