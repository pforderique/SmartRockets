function randChoice(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

function roundDec(number, places) {
  const multiplier = Math.pow(10, places);
  return Math.round(number * multiplier) / multiplier;
}