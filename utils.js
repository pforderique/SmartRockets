function randChoice(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

function roundDec(number, places) {
  const multiplier = Math.pow(10, places);
  return Math.round(number * multiplier) / multiplier;
}

function drawObstacle(x1, y1, x2, y2) {
  push();
  stroke(255);
  strokeWeight(3);
  line(x1, y1, x2, y2);
  pop();
}

// true iff mouse in bounds of the display
function mouseInBounds() {
  return mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height;
}

// true iff mouse over target, else false
function mouseOverTarget() {
  return (
    abs(mouseX - target.target.x) < target.radius &&
    abs(mouseY - target.target.y) < target.radius
  );
}

// show the correct cursor icon depending on state and location
function updateCursor() {
  mouseOverTarget() ? cursor("grab") : cursor("default");
}

// show the current stats (generation, life count, etc.) of simulation
function showStats() {
  const posx = 10;
  const posy = 30;
  const spacing = textAscent() + 10;
  const size = 15;

  push();
  fill(255);
  textSize(size);
  text(`Lifespan: ${lifeCount}/${currentLifespan}`, posx, posy);
  text("Generation: " + generation, posx, posy + spacing);

  textAlign(RIGHT);
  text(
    "Best Fitness Seen: " + roundDec(bestFitnessSeen, 0),
    width - posx,
    posy
  );
  text(`Mutation Rate: ${mutationRate}`, width - posx, posy + spacing);
  pop();
}

// shows the UI controls attached to DOM
function setupUIControls() {
  const minMutationRate = 0;
  const maxMutationRate = 0.1;
  const minLifespan = 50;
  const maxLifespan = 800;

  const topControlsDiv = createDiv("")
    .style("width", `${windowSize}px`)
    .style("display", "flex")
    .style("align-items", "center")
    .style("justify-content", "space-between");
  const bottomControlsDiv = createDiv("")
    .style("width", `${windowSize}px`)
    .style("display", "flex")
    .style("align-items", "center")
    .style("justify-content", "space-between");

  const lifespanLabel = createDiv(`Lifespan (${minLifespan}-${maxLifespan})`)
    .style("display", "flex")
    .style("align-items", "center")
    .parent(topControlsDiv);
  lifespanSlider = createSlider(minLifespan, maxLifespan, currentLifespan, 50)
    .style("width", `${windowSize / 4}px`)
    .parent(lifespanLabel);

  const mutationLabel = createDiv(`Mutation Rate`)
    .style("display", "flex")
    .style("align-items", "center")
    .parent(bottomControlsDiv);
  mutationSlider = createSlider(
    minMutationRate,
    maxMutationRate,
    mutationRate,
    0.005
  )
    .style("width", `${windowSize / 10}px`)
    .parent(mutationLabel);

  statsButton = createCheckbox("show stats", true).parent(topControlsDiv);
  showOneButton = createCheckbox("show best", false).parent(bottomControlsDiv);
}

// shuffles an array by mutation
// source: https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
function shuffleArray(array) {
  for (let idx = array.length - 1; idx > 0; idx--) {
    // swap each idx in array with random idx
    const randIdx = Math.floor(Math.random() * (i + 1));
    [array[idx], array[randIdx]] = [array[randIdx], array[idx]];
  }
}

// source: https://bryceboe.com/2006/10/23/line-segment-intersection-algorithm/
function ccw(p1, p2, p3) {
  return (p3.y - p1.y) * (p2.x - p1.x) > (p2.y - p1.y) * (p3.x - p1.x);
}

// both `line1` and `line2` must have x1, x2, y1, and y2 fields
// source: https://bryceboe.com/2006/10/23/line-segment-intersection-algorithm/
function lineSegmentsIntersect(line1, line2) {
  // `line1` is segment AB
  const A = { x: line1.x1, y: line1.y1 };
  const B = { x: line1.x2, y: line1.y2 };
  // `line2` is segment CD
  const C = { x: line2.x1, y: line2.y1 };
  const D = { x: line2.x2, y: line2.y2 };

  return ccw(A, C, D) != ccw(B, C, D) && ccw(A, B, C) != ccw(A, B, D);
}

// both `point` and `origin` must have x1, x2, y1, and y2 fields
// angle in radians
function rotatePoint(point, origin, angle) {
  return {
    x:
      (point.x - origin.x) * Math.cos(angle) -
      (point.y - origin.y) * Math.sin(angle) +
      origin.x,
    y:
      (point.x - origin.x) * Math.sin(angle) +
      (point.y - origin.y) * Math.cos(angle) +
      origin.y,
  };
}
