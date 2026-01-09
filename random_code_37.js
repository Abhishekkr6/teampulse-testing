// Simple random quote picker (Node.js)
const quotes = [
  "Stay curious, keep coding.",
  "One bug closer to mastery.",
  "Ship it, then polish it.",
  "Reading code is writing code.",
  "You learn most from broken things."
];

function randomQuote() {
  const idx = Math.floor(Math.random() * quotes.length);
  return quotes[idx];
}

console.log("Random Quote");
console.log("============\n");
console.log(randomQuote());


