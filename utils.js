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

// source: https://bryceboe.com/2006/10/23/line-segment-intersection-algorithm/
function ccw(p1, p2, p3) {
  return (p3.y-p1.y) * (p2.x-p1.x) > (p2.y-p1.y) * (p3.x-p1.x);
}

// both `line1` and `line2` must have x1, x2, y1, and y2 fields
// source: https://bryceboe.com/2006/10/23/line-segment-intersection-algorithm/
function lineSegmentsIntersect(line1, line2) {
  // `line1` is segment AB
  const A = {x: line1.x1, y: line1.y1};
  const B = {x: line1.x2, y: line1.y2};
  // `line2` is segment CD
  const C = {x: line2.x1, y: line2.y1};
  const D = {x: line2.x2, y: line2.y2};

  return ccw(A,C,D) != ccw(B,C,D) && ccw(A,B,C) != ccw(A,B,D)
}

// both `point` and `origin` must have x1, x2, y1, and y2 fields
// angle in radians
function rotatePoint(point, origin, angle) {
  // return {
  //   x: point.x,
  //   y: point.y
  // }
  return {
    x: (point.x - origin.x)*Math.cos(angle) - (point.y - origin.y)*Math.sin(angle) + origin.x,
    y: (point.x - origin.x)*Math.sin(angle) + (point.y - origin.y)*Math.cos(angle) + origin.y,
  };
}