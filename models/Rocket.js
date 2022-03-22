class Rocket {
    constructor() {
        this.pos = createVector(width/2, height);
        // this.vel = createVector(0, -1);
        this.vel = p5.Vector.random2D();
        this.acc = createVector();
    }

    applyForce(force) {
        this.acc.add(force);
    }
  
    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
    }

    show() {
        const bodyWidth = 10;
        const bodyHeight = 50;
        const tipHeight = 10;

        push();
        noStroke();
        fill(255, 150);
        // translate to make drawing easier
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        rectMode(CENTER);
        rect(0, 0, bodyHeight, bodyWidth); // body
        triangle(
            bodyHeight/2, -bodyWidth/2, 
            bodyHeight/2, bodyWidth/2, 
            bodyHeight/2 + tipHeight, 0
        ); // tip
        pop();
    }
  }
  