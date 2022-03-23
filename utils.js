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
  strokeWeight(1);
  line(x1, y1, x2, y2);
  pop();
}