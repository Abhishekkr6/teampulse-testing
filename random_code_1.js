// Random utility to generate and log a few numbers
function randomNumbers(count = 5, min = 0, max = 100) {
  const nums = [];
  for (let i = 0; i < count; i++) {
    const n = Math.floor(Math.random() * (max - min + 1)) + min;
    nums.push(n);
  }
  return nums;
}

function run() {
  const nums = randomNumbers();
  console.log("Random numbers:", nums.join(", "));
}

run();


