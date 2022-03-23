function randChoice(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

function round2Dec(number) {
  return Math.round(number * 100) / 100;
}